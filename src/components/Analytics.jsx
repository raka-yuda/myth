'use client';

import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      strategy="afterInteractive"
      src={process.env.UMAMI_SCRIPT_URL}
      data-website-id={process.env.UMAMI_WEBSITE_ID}
    />
  );
}