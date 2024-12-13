'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      strategy="afterInteractive"
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
    />
  );
}