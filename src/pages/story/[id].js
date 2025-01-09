import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import LanguageSelector from '@/components/LanguageSelector';
import StoryMDXRenderer from '@/components/StoryMDXRenderer';
import TableOfContents from '@/components/TableOfContents';

export default function StoryPage({ currentStory, mdxHeadings, mdxContent, metadata, initialLanguage }) {
  const router = useRouter();
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (currentStory) {
      const languages = Object.keys(currentStory.title);
      setAvailableLanguages(languages);
      // Use query parameter language if available, otherwise use initialLanguage
      const queryLang = router.query.lang;
      if (queryLang && languages.includes(queryLang)) {
        setLanguage(queryLang);
      } else {
        setLanguage(initialLanguage || languages[0]);
      }
    }
  }, [currentStory, initialLanguage, router.query.lang]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, lang: newLanguage },
      },
      undefined,
      { shallow: true }
    );
  };

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>{currentStory ? currentStory.title[language] : "Story"} | Myth</title>
      </Head>

      <Navbar links={LINKS} isNavbarFixed={true}/>

      <main className="container max-w-7xl mx-auto px-4 h-full min-h-[100vh] flex flex-col items-center justify-between pt-24 pb-16">
        <div className="flex-col justify-start w-full">
          {currentStory ? (
            <div>
              <div className="flex flex-col justify-center items-start mb-12 gap-4">
                <LanguageSelector
                  availableLanguages={availableLanguages}
                  currentLanguage={language}
                  onLanguageChange={handleLanguageChange}
                />
                <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800">
                  {currentStory.title[language]}
                </h1>
              </div>
              
              {mdxContent && mdxContent[language] ? (
                // <StoryMDXRenderer content={mdxContent[language]} language={language} />
                <div className="flex flex-col-reverse lg:flex-row gap-8 ">
                  <main className="lg:w-3/4">
                    <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="prose prose-lg max-w-none px-6 py-8">
                      <StoryMDXRenderer content={mdxContent[language]} language={language} metadata={metadata}/>
                      </div>
                    </article>
                  </main>
                  <aside className="flex flex-col lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
                    <TableOfContents headings={mdxHeadings[language]} />
                  </aside>
                </div>
              ) : (
                <p className="text-xl text-gray-600 mb-6">
                  {currentStory.full_story[language]}
                </p>
              )}
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
  const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const myths = JSON.parse(fileContents);

  // Generate paths for each ID without locale
  const paths = myths.flatMap((myth) => 
    Object.entries(myth.id).map(([lang, id]) => ({
      params: { id },
    }))
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const { id } = params;
    const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const myths = JSON.parse(fileContents);

    const myth = myths.find((myth) => Object.values(myth.id).includes(id));
    
    const mdxContent = {};
    const mdxHeadings = {}; // Store headings per language
    const mdxMetadata = {};

    for (const lang of Object.keys(myth.story_path)) {
      try {
        const mdxPath = path.join(process.cwd(), 'src/contents/stories', `${myth.story_path[lang]}.mdx`);
        if (fs.existsSync(mdxPath)) {
          const mdxSource = fs.readFileSync(mdxPath, 'utf8');

          // Parse the frontmatter
          const { content, data } = matter(mdxSource);

          // Extract headings
          const headings = content.split('\n')
            .filter(line => line.startsWith('#'))
            .map(line => {
              const level = line.match(/^#+/)[0].length;
              const text = line.replace(/^#+\s+/, '');
              const id = text.toLowerCase().replace(/[^\w]+/g, '-');
              return { level, text, id };
            });
            
          // mdxMetadata[lang] = data;
          
          mdxHeadings[lang] = headings;

          mdxContent[lang] = await serialize(content);
        }
      } catch (error) {
        console.log(`No MDX content found for ${id} in ${lang}`);
      }
    }

    // Find the initial language from the myth's ID mapping
    const initialLanguage = Object.entries(myth.id).find(([_, val]) => val === id)?.[0];

    // console.log(mdxMetadata)

    return { 
      props: { 
        currentStory: myth,
        mdxHeadings: Object.keys(mdxHeadings).length > 0 ? mdxHeadings : null,
        mdxContent: Object.keys(mdxContent).length > 0 ? mdxContent : null,
        metadata: mdxMetadata || {},
        initialLanguage
      } 
    };
  } catch (error) {
    console.error(`Error in getStaticProps for id ${params.id}:`, error);
    return { notFound: true };
  }
}