import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';

import LINKS from "@/constants/links";

import LanguageSelector from "@/components/LanguageSelector";
import CardStory from '@/components/CardStory';
import Navbar from "@/components/Navbar";

function getRandomElements(arr, num) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num);
}

export default function Home({ myths }) {
  const availableLanguages = useMemo(() => Object.keys(myths[0]?.title || {}), [myths]);

  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState(availableLanguages[0] || '');


  useEffect(() => { 
    if (myths && myths.length > 0) {
      const languages = Object.keys(myths[0].title);
      setLanguage(languages[0]);
    }
    setIsLoading(false);
  }, [myths]);

  if (isLoading) {
    return <div>Loading...</div>;
  };

  return (
    <>
      <Head>
        <title>Home | Myth</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar links={LINKS} />
        <main className="container max-w-7xl mx-auto px-4 pt-28 md:pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
          <div className="flex-col justify-center max-w-7xl h-full md:pt-36 w-full">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800" data-testid="main-heading">
                Myth
              </h1>
              <LanguageSelector
                availableLanguages={availableLanguages}
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myths && myths.map((story) => (
                <CardStory 
                  key={`story-${story?.id[language]}`}
                  story={story}
                  language={language}
                />
              ))}
            </div>
          </div>
          <footer className="flex self-end text-center py-8 text-black">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Made with ❤️
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
     const { default: allMyths } = await import('@/datas/myths.json');
    
     const selectedMyths = allMyths.length <= 3 
       ? allMyths 
       : getRandomElements(allMyths, 3);
 
     return {
       props: {
         myths: selectedMyths
       },
       revalidate: 3600 // Regenerate page every hour
     };

    
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}