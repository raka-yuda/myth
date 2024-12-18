import Analytics from "@/components/Analytics";
import Loading from "@/components/Loading";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Cardo } from '@next/font/google';

const cardo = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Myth</title>
        <meta name="description" content="Explore ancient myths and their fascinating stories from different cultures. Learn about legends, gods, and heroes." />
        <meta name="keywords" content="myths, legends, ancient stories, gods, heroes" />
        <meta property="og:title" content="Myth | Explore Ancient Myths" />
        <meta property="og:description" content="Discover and read various ancient myths from around the world. Delve into fascinating legends and more." />
        <meta property="og:image" content="https://images.pexels.com/photos/2823459/pexels-photo-2823459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <meta property="og:url" content="https://myth.ryuda.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Explore Ancient Myths",
              "description": "Explore ancient myths and their fascinating stories from different cultures.",
              "author": {
                "@type": "Person",
                "name": "ryuda"
              },
              "datePublished": "2024-09-17",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://myth.ryuda.me"
              }
            }),
          }}
        />
      </Head>
      <div className={cardo.className}>
        {(process.env.NODE_ENV === "production") && <Analytics />}
        {isLoading ? (
          <Loading text="Welcome to the Mythical World!" duration={1000} />
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
}
