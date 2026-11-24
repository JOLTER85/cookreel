'use client';

import React, { useState } from 'react';
import { THIRTY_DAY_ADSENSE_PLAN } from '@/lib/cookreel-data';
import {
  X,
  CheckSquare,
  Square,
  Download,
  Check,
  Send,
  FileText,
  ShieldCheck,
} from 'lucide-react';

export type LegalModalType =
  | null
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'roadmap';

interface LegalAndAdsenseModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
  lang: 'en' | 'ar';
}

const TOXIC_DISAVOW_DOMAINS = [
  'rankinghighseo.shop',
  '54232758.xyz',
  '37486457.xyz',
  'link-baron-optimal-organic-collective.store',
  'thebacklinks.shop',
  '11764015.xyz',
  'contextual-link-baron-services.store',
  '12343475.xyz',
  'freerankchecker.website',
  'domainpadachecker.website',
  'massbacklinkchecker.store',
  'trafficforseo.info',
  'newsblogsports.site',
  'cinto.shop',
  'pageseomasters.shop',
  'buy-dofollow-links.shop',
];

export default function LegalAndAdsenseModals({
  activeModal,
  onClose,
  lang,
}: LegalAndAdsenseModalsProps) {
  const isAr = lang === 'ar';

  // 30-Day AdSense Plan Checklist State
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    'w1-1',
    'w1-2',
    'w1-3',
    'w2-1',
    'w2-2',
    'w4-1',
  ]);

  // Contact Us Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmittedId, setContactSubmittedId] = useState<string | null>(
    null
  );
  const [isSendingContact, setIsSendingContact] = useState(false);

  if (!activeModal) return null;

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleDownloadDisavowFile = () => {
    const content = [
      '# Google Search Console Disavow File for cookreel.com',
      '# Week 1 Technical SEO Foundation — Purge legacy spam backlinks',
      ...TOXIC_DISAVOW_DOMAINS.map((d) => `domain:${d}`),
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disavow-cookreel.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }
    setIsSendingContact(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || 'Editorial & Recipe Inquiry',
          message: contactMessage.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setContactSubmittedId(data.inquiryId || 'INQ-2026');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      }
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[88vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-800" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              {activeModal === 'about' &&
                (isAr
                  ? 'من نحن — قصة ومنهجية مطبخ CookReel.com'
                  : 'About Us — CookReel.com Editorial & Test Kitchen')}
              {activeModal === 'contact' &&
                (isAr
                  ? 'اتصل بنا — التواصل مع فريق التحرير والإعلانات'
                  : 'Contact Us — Editorial, Press & Advertising')}
              {activeModal === 'privacy' &&
                (isAr
                  ? 'سياسة الخصوصية وملفات تعريف الارتباط (Google AdSense)'
                  : 'Privacy Policy & Google AdSense Cookie Disclosure')}
              {activeModal === 'terms' &&
                (isAr
                  ? 'الشروط والأحكام وإخلاء المسؤولية الغذائية'
                  : 'Terms & Conditions and Culinary Disclosure')}
              {activeModal === 'roadmap' &&
                (isAr
                  ? 'خطة الـ 30 يوماً للانطلاق والقبول في Google AdSense'
                  : '30-Day Google AdSense Launch & SEO Checklist')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
          {/* 1. ABOUT US PAGE */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-amber-800">
                ESTABLISHED 2016 · REIMAGINED FOR SHORT-FORM CULINARY VIDEO
              </p>
              <h4 className="text-lg font-bold text-slate-900">
                {isAr
                  ? 'رسالتنا: تبسيط الطبخ المنزلي عبر الفيديو القصير والمقالات العلمية الدقيقة'
                  : 'Our Mission: Simplifying Home Cooking Through Short-Form Video & Food Science'}
              </h4>
              <p>
                {isAr
                  ? 'تأسست منصة CookReel.com بهدف جعل الطهي المنزلي الاحترافي واضحاً وسريعاً وممتعاً. نحن نؤمن بأن أفضل الوصفات هي التي تجمع بين الفيديو القصير المباشر (15 إلى 60 ثانية) وبين الشرح التحريري المفصل الذي يوضح لماذا تنجح الوصفة، وما هي بدائل المكونات الدقيقة المتوفرة في مطبخك.'
                  : 'CookReel.com was founded on a simple culinary conviction: great cooking should be visual, dependable, and accessible on a busy schedule. Originally featured by Trend Hunter as a pioneer in video-based recipes, our platform pairs concise step-by-step video reels with thorough 1,000-word culinary guides.'}
              </p>
              <h5 className="text-sm font-bold text-slate-900 pt-2">
                {isAr
                  ? 'معايير الجودة والمصداقية (E-E-A-T Culinary Standards)'
                  : 'Our Test Kitchen & E-E-A-T Editorial Standards'}
              </h5>
              <ul className="list-disc pl-5 pr-5 space-y-2">
                <li>
                  {isAr
                    ? 'اختبار حقيقي 100%: كل وصفة تُنشر على CookReel يتم طهيها وتصويرها وقياسها بالجرام والدقيقة في استوديو المطبخ الخاص بنا قبل النشر.'
                    : '100% Kitchen-Tested: Every recipe across our 4 core departments (Quick & Easy, Healthy & Diet, Desserts & Baking, and Kitchen Hacks) is tested at least three times with gram-accurate measurements.'}
                </li>
                <li>
                  {isAr
                    ? 'صور وفيديوهات أصلية: جميع مقاطع الفيديو والصور المنشورة مملوكة حصرياً لمنصة CookReel.com لضمان أعلى معايير حقوق الملكية الفكرية.'
                    : 'Original Visual Media: All step-by-step photography and HD MP4 video reels are produced in-house with zero scraped or third-party copyrighted imagery.'}
                </li>
                <li>
                  {isAr
                    ? 'بدائل المكونات الشاملة: نرفق في كل مقال جدولاً علمياً لبدائل المكونات ليناسب مختلف الحميات (كيتو، عالي البروتين، خالٍ من الألبان أو الغلوتين).'
                    : 'Verified Ingredient Substitutions: Every article includes a dedicated substitution matrix and storage FAQ so readers never waste groceries.'}
                </li>
              </ul>
            </div>
          )}

          {/* 2. CONTACT US PAGE */}
          {activeModal === 'contact' && (
            <div className="space-y-5">
              <p>
                {isAr
                  ? 'نرحب باستفسارات القراء، وملاحظات تجارب الوصفات، وطلبات التعاون الإعلاني والرعايات التجارية. فريق التحرير يرد على كافة الرسائل خلال 24 ساعة عمل.'
                  : 'We welcome recipe questions from home cooks, press inquiries, and culinary brand sponsorship requests. Our editorial team responds within 24 business hours.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#FAF9F6] border border-slate-200 text-xs font-mono">
                <div>
                  <div className="text-slate-500">Editorial & Recipes</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    editorial@cookreel.com
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Advertising & Media</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    partners@cookreel.com
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Test Kitchen Studio</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    CookReel Culinary Media
                  </div>
                </div>
              </div>

              {contactSubmittedId ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>
                      {isAr
                        ? `تم استلام رسالتك بنجاح (رقم المرجع: #${contactSubmittedId})`
                        : `Message Received (Reference #${contactSubmittedId})`}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    {isAr
                      ? 'تم حفظ رسالتك في قاعدة بيانات الموقع وسيتواصل معك فريق تحرير CookReel قريباً.'
                      : 'Your message has been logged in our editorial database. Our team will reply shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'الاسم الكامل:' : 'Your Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isAr ? 'البريد الإلكتروني:' : 'Email Address:'}
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'الموضوع:' : 'Subject:'}
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder={
                        isAr
                          ? 'استفسار عن وصفة / إعلان / شراكة...'
                          : 'Recipe Question / Advertising / Partnership...'
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isAr ? 'الرسالة:' : 'Message:'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isSendingContact
                        ? isAr
                          ? 'جاري الإرسال...'
                          : 'Sending...'
                        : isAr
                        ? 'إرسال الرسالة'
                        : 'Send Message'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. PRIVACY POLICY (Mandatory AdSense DoubleClick DART Cookie Disclosure) */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-slate-500">
                EFFECTIVE DATE: NOVEMBER 24, 2026 · GOOGLE ADSENSE & GDPR
                COMPLIANT
              </p>
              <h4 className="text-base font-bold text-slate-900">
                {isAr
                  ? '1. سياسة الخصوصية وحماية بيانات الزوار في CookReel.com'
                  : '1. Overview & Visitor Data Protection'}
              </h4>
              <p>
                {isAr
                  ? 'تحترم منصة CookReel.com خصوصية جميع زوارها وتلتزم بحماية البيانات الشخصية وفق لوائح GDPR وCCPA وشروط برنامج Google AdSense الإعلاني.'
                  : 'At CookReel.com, accessible from https://cookreel.com, the privacy of our visitors is one of our highest priorities. This Privacy Policy document outlines the types of information collected and recorded by CookReel.com and how we use it.'}
              </p>
              <h4 className="text-base font-bold text-slate-900">
                {isAr
                  ? '2. ملفات تعريف الارتباط الخاصة بإعلانات جوجل (Google DoubleClick DART Cookie)'
                  : '2. Google AdSense & DoubleClick DART Cookie Disclosure'}
              </h4>
              <p>
                {isAr
                  ? 'تستخدم شركة Google، بصفتها مورّداً خارجياً، ملفات تعريف الارتباط (Cookies) لعرض الإعلانات على موقع CookReel.com. يتيح استخدام Google لملفات تعريف الارتباط DART عرض الإعلانات للمستخدمين استناداً إلى زيارتهم لموقعنا وللمواقع الأخرى على شبكة الإنترنت. يمكن للزوار اختيار عدم استخدام ملفات تعريف الارتباط DART عن طريق زيارة سياسة الخصوصية الخاصة بشبكة إعلانات Google والمحتوى.'
                  : 'Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to https://cookreel.com and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at https://policies.google.com/technologies/ads.'}
              </p>
              <h4 className="text-base font-bold text-slate-900">
                {isAr
                  ? '3. الإفصاح عن روابط التسويق بالعمولة (Affiliate Disclosure)'
                  : '3. Amazon & Culinary Affiliate Disclosure'}
              </h4>
              <p>
                {isAr
                  ? 'يشارك موقع CookReel.com في برامج التسويق بالعمولة لأدوات المطبخ المعتمدة (مثل Amazon Associates). عند النقر على روابط أدوات الطهي والشراء، قد نحصل على عمولة صغيرة دون أي تكلفة إضافية عليك.'
                  : 'CookReel.com participates in culinary affiliate programs including the Amazon Services LLC Associates Program. When you purchase recommended skillets or chef knives through our links, we may earn an affiliate commission at no extra cost to you.'}
              </p>
            </div>
          )}

          {/* 4. TERMS & CONDITIONS */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-slate-500">
                LAST UPDATED: NOVEMBER 24, 2026
              </p>
              <h4 className="text-base font-bold text-slate-900">
                {isAr
                  ? '1. حقوق الملكية الفكرية للوصفات والفيديوهات'
                  : '1. Intellectual Property & Original Media Rights'}
              </h4>
              <p>
                {isAr
                  ? 'جميع مقاطع الفيديو، الصور، النصوص التحريرية، وجداول بدائل المكونات المنشورة على CookReel.com هي ملكية حصرية للموقع. يُسمح بمشاركة رابط الوصفة مع ذكر المصدر، ويُمنع نسخ المقالات أو إعادة رفع الفيديوهات بدون إذن خطي.'
                  : 'All original video reels, step-by-step photographs, and long-form recipe articles published on CookReel.com are protected by copyright laws. You may share links to our recipes with attribution, but republishing full recipe texts or video files without written consent is prohibited.'}
              </p>
              <h4 className="text-base font-bold text-slate-900">
                {isAr
                  ? '2. إخلاء المسؤولية الغذائية والصحية (Nutritional Disclaimer)'
                  : '2. Nutritional & Food Safety Disclaimer'}
              </h4>
              <p>
                {isAr
                  ? 'يتم حساب السعرات الحرارية ونسب البروتين والكربوهيدرات في كل وصفة باستخدام قواعد بيانات التغذية القياسية كدليل إرشادي، وقد تختلف القيم الفعلية قليلاً حسب العلامات التجارية للمكونات المستخدمة.'
                  : 'Nutritional values (calories, protein, and net carbohydrates) provided in our Recipe Schema Cards are calculated estimates for informational purposes. Readers following strict medical or ketogenic diets should verify specific ingredient labels.'}
              </p>
            </div>
          )}

          {/* 5. 30-DAY ADSENSE LAUNCH & DISAVOW TRACKER */}
          {activeModal === 'roadmap' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'ملف تنظيف الباك لينكات الجاهز لـ Google Search Console'
                        : 'Google Search Console Disavow File Ready'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {isAr
                      ? 'يحتوي على الـ 16 نطاق سبام (.xyz / .shop / .store) المكتشفة في فحص Ahrefs.'
                      : 'Contains all 16 toxic .xyz/.shop/.store spam domains identified in Ahrefs.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadDisavowFile}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {isAr
                      ? 'تحميل disavow-cookreel.txt'
                      : 'Download disavow-cookreel.txt'}
                  </span>
                </button>
              </div>

              <div className="space-y-5">
                {THIRTY_DAY_ADSENSE_PLAN.map((weekBlock, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-4 space-y-3"
                  >
                    <h4 className="text-sm font-bold text-slate-900">
                      {isAr ? weekBlock.weekAr : weekBlock.weekEn}
                    </h4>
                    <div className="space-y-2">
                      {weekBlock.tasks.map((task) => {
                        const isDone = completedTasks.includes(task.id);
                        return (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className={`w-full flex items-start gap-2.5 p-3 rounded-lg border text-xs text-left transition-colors ${
                              isDone
                                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className="leading-relaxed">
                              {isAr ? task.textAr : task.textEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>CookReel.com</span>
            <span aria-hidden="true">·</span>
            <span>AdSense E-E-A-T Compliant</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
