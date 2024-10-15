import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import LanguageSelector from '@/components/LanguageSelector';

export default function StoryPage({ currentStory }) {
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (currentStory) {
      const languages = Object.keys(currentStory.title);
      setAvailableLanguages(languages);
      setLanguage(languages[0]); // Set the first available language as default
    }
  }, [currentStory]);

  const toggleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    setLanguage(availableLanguages[nextIndex]);
  };

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>{currentStory ? currentStory.title[language] : "Story"} | Myth</title>
      </Head>

      <Navbar links={LINKS} />

      <main className="container max-w-7xl mx-auto px-4 pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
        <div className="flex-col justify-start mt-12 w-full">
          {currentStory ? (
            <div>
              <div className="flex flex-col justify-center items-start mb-12 gap-4">
                <LanguageSelector
                  availableLanguages={availableLanguages}
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
                <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800">
                  {currentStory.title[language]}
                </h1>
                {/* <button 
                  onClick={toggleLanguage} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {availableLanguages[(availableLanguages.indexOf(language) + 1) % availableLanguages.length]}
                </button> */}
              </div>
              <p className="text-xl text-gray-600 mb-6">
                {currentStory.full_story[language]}
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800 mb-12 mt-16 md:mt-0">
                Myth - Story
              </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  console.log('Starting getStaticPaths');
  try {
    const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const myths = JSON.parse(fileContents);
  
    const paths = myths.flatMap((myth) => 
      Object.values(myth.id).map((id) => ({
        params: { id },
      }))
    );

    console.log('Generated paths:', JSON.stringify(paths, null, 2));

    return { paths, fallback: false };
  } catch (error) {
    console.error('Failed to fetch myths:', error);
    console.error('Error stack:', error.stack);
    throw error; // Re-throw the error to fail the build
  }
}

export async function getStaticProps({ params }) {
  console.log(`Starting getStaticProps for id: ${params.id}`);
  try {
    const { id } = params;
    const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const myths = JSON.parse(fileContents);

    const myth = myths.find((myth) => Object.values(myth.id).includes(id));

    return { 
      props: { 
        currentStory: myth
      } 
    };
  } catch (error) {
    console.error(`Error in getStaticProps for id ${params.id}:`, error);
    console.error('Error stack:', error.stack);
    return { notFound: true };
  }
}