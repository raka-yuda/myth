import fs from 'fs';
import path from 'path';

import Head from 'next/head';
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";

export default function StoryPage({currentStory}) {

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>{currentStory ? currentStory.title.english : "Story"} | Myth</title>
      </Head>

      <Navbar links={LINKS} />

      <main className="container max-w-7xl mx-auto px-4 pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
        <div className="flex-col justify-start mt-12">
          {currentStory ? (
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800 mb-12 mt-16 md:mt-0">
                {currentStory.title.english}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {currentStory.full_story.english}
              </p>
            </div>
          ) : (
            <div>
              <div>
              <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800 mb-12 mt-16 md:mt-0">
                  Myth - Story
                </h1>
              </div>
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
  
    const paths = myths.map((myth) => ({
      params: { id: myth.id.english },
    }));

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

    const myth = myths.find((myth) => (myth.id.english === id || myth.id.indonesian === id));

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