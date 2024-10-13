import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import { Inter } from "next/font/google";
import Head from 'next/head';
import Link from "next/link";
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";

const inter = Inter({ subsets: ["latin"] });

function getRandomElements(arr, num) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, num);
}

export default function Home({ myths }) {
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (myths && myths.length > 0) {
      const languages = Object.keys(myths[0].title);
      setAvailableLanguages(languages);
      setLanguage(languages[0]); // Set the first available language as default
    }
  }, [myths]);

  const toggleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    setLanguage(availableLanguages[nextIndex]);
  };

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Home | Myth</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar links={LINKS} />
        <main className="container max-w-7xl mx-auto px-4 pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
          <div className="flex-col justify-center max-w-7xl h-full md:pt-36">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800">
                Myth
              </h1>
              <button 
                onClick={toggleLanguage} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {availableLanguages[(availableLanguages.indexOf(language) + 1) % availableLanguages.length]}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myths && myths.map((story) => (
                <div 
                  key={`story-${story.id[language]}`} 
                  className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center"
                >
                  <div className="flex flex-col rounded border-2 border-white p-4 h-full justify-between">
                    <p className="text-xl text-gray-600 mb-24">
                      {story.title[language]}
                    </p>
                    <p className="text-xl text-gray-600 mb-2">
                      {language === 'english' ? 'Synopsis:' : 'Sinopsis:'}
                    </p>
                    <p className="text-xl text-gray-600 mb-6 line-clamp-5">
                      {story.synopsis[language]}
                    </p>
                    <Link
                      href={`/story/${story.id[language]}`} 
                      className="text-base text-end text-gray-600 mb-2 hover:underline"
                    >
                      {language === 'english' ? 'Read More...' : 'Baca Selengkapnya...'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <footer className="flex self-end text-center py-8 text-black">
            <a href="#" target="_blank" rel="noopener noreferrer">
              {language === 'english' ? 'Made with ❤️' : 'Dibuat dengan ❤️'}
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const myths = JSON.parse(fileContents);

    return { 
      props: { 
        myths: getRandomElements(myths, 3)
      } 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { notFound: true };
  }
}