import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #b45309 0%, #78350f 55%, #0f172a 100%)',
          borderRadius: '16px',
          border: '2px solid #fbbf24',
          color: '#ffffff',
          fontFamily: 'serif',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: '-1px',
        }}
      >
        CR
      </div>
    ),
    {
      ...size,
    }
  );
}
