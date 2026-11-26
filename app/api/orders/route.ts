import { NextRequest, NextResponse } from 'next/server';
import {
  readDatabase,
  writeDatabase,
  sanitizeText,
  KitchenOrder,
  ContactInquiry,
  verifyAntiSpamChallenge,
} from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Handle Newsletter / Meal-Prep Playbook Subscription
    if (body.type === 'subscribe') {
      const email = sanitizeText(body.email, 120);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: 'Please provide a valid email address.' },
          { status: 400 }
        );
      }
      const db = readDatabase();
      if (
        !db.subscribers.some(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        )
      ) {
        db.subscribers.push({
          email,
          subscribedAt: new Date().toISOString(),
        });
        writeDatabase(db);
      }
      return NextResponse.json({
        subscribed: true,
        totalSubscribers: db.subscribers.length,
      });
    }

    // 2. Handle Contact Us Page Inquiry Submission
    if (body.type === 'contact') {
      if (
        !verifyAntiSpamChallenge(
          body.captchaA,
          body.captchaB,
          body.captchaAnswer,
          body.websiteHoneypot
        )
      ) {
        return NextResponse.json(
          { error: 'Please complete the anti-spam math verification.' },
          { status: 400 }
        );
      }
      const name = sanitizeText(body.name, 80);
      const email = sanitizeText(body.email, 120);
      const subject = sanitizeText(body.subject, 120) || 'General Editorial Inquiry';
      const message = sanitizeText(body.message, 1000);
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'Please fill in your name, email, and message.' },
          { status: 400 }
        );
      }
      const db = readDatabase();
      const inquiry: ContactInquiry = {
        id: `INQ-${Date.now()}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };
      db.inquiries = [inquiry, ...db.inquiries];
      writeDatabase(db);
      return NextResponse.json({ inquirySent: true, inquiryId: inquiry.id });
    }

    // 3. Handle Kitchen Gear Order Checkout
    const customerName = sanitizeText(body.customerName, 80);
    const customerEmail = sanitizeText(body.customerEmail, 120);
    const shippingAddress = sanitizeText(body.shippingAddress, 200);
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !shippingAddress || rawItems.length === 0) {
      return NextResponse.json(
        { error: 'Please complete name, delivery address, and cookware items.' },
        { status: 400 }
      );
    }

    const items: KitchenOrder['items'] = rawItems
      .slice(0, 20)
      .map((item: Record<string, unknown>) => ({
        id: sanitizeText(item.id, 60) || 'gear-item',
        name: sanitizeText(item.name, 120) || 'Chef Cookware',
        brand: sanitizeText(item.brand, 60) || 'CookReel Select',
        priceUsd: Math.min(Math.max(Number(item.priceUsd) || 50, 1), 5000),
        qty: Math.min(Math.max(Math.round(Number(item.qty) || 1), 1), 20),
      }));

    const totalUsd = items.reduce(
      (sum: number, i) => sum + i.priceUsd * i.qty,
      0
    );
    const orderId = `CR-${Math.floor(1000 + Math.random() * 9000)}`;

    const order: KitchenOrder = {
      orderId,
      customerName,
      customerEmail,
      shippingAddress,
      items,
      totalUsd,
      status: 'Confirmed — Preparing Shipment',
      createdAt: new Date().toISOString(),
    };

    const db = readDatabase();
    db.orders = [order, ...db.orders];
    writeDatabase(db);

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
