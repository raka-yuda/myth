import { useEffect, useState } from 'react';
import TriviaCard from '@/components/TriviaCard';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import { useRouter } from 'next/router';
import Error from 'next/error';
import { fetchAllMyths, fetchMythById } from '@/services/myths';

export default function StoryPage({currentStory}) {

  const router = useRouter();
  const { query } = router;

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>Myth | {currentStory ? currentStory.title.english : "Story"}</title>
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

// export async function getServerSideProps(context) {
//   const myths = [
//     {
//       id: "legenda-danau-toba",
//       title: "Legenda Danau Toba",
//       synopsis: "Seorang pemuda bernama Toba menikahi seorang putri ikan. Mereka memiliki seorang anak, tapi Toba melanggar janji yang dibuat dengan istrinya, menyebabkan terjadinya bencana besar yang membentuk Danau Toba.",
//       full_story: "",
//       background_image: "",
//     },
//     {
//       id: "legenda-malin-kundang",
//       title: "Legenda Malin Kundang",
//       synopsis: "Seorang pemuda bernama Malin Kundang durhaka kepada ibunya setelah menjadi kaya. Karena itu, dia dikutuk menjadi batu oleh ibunya.",
//       full_story: "",
//       background_image: "",
//     },
//     {
//       id: "legenda-roro-jonggrang",
//       title: "Legenda Roro Jonggrang",
//       synopsis: "Seorang putri cantik bernama Roro Jonggrang meminta seorang pangeran untuk membangun seribu candi dalam semalam sebagai syarat pernikahan. Pangeran hampir berhasil, tapi Roro Jonggrang menggagalkan usahanya.",
//       full_story: "",
//       background_image: "",
//     },
//   ];

  
//   const { id } = context.params;
//   const currentStory = myths.find(story => story.id === id); 

//   if (!currentStory) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { currentStory },
//   };
// }


export async function getStaticPaths() {
  try {
    const myths = await fetchAllMyths();

    console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);

    const paths = myths.map((myth) => ({
      params: { id: myth.id.english },
    }));

    console.log('paths:', paths);

    return { paths, fallback: false };
  } catch (error) {
    console.error('Failed to fetch myths:', error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  // const response = await fetchMythById(params.id);
  // if (!response.ok) {
  //   return { notFound: true };
  // }
  // const currentStory = await response.json();

  // return { props: { currentStory } };
  try {
    const currentStory = await fetchMythById(params.id);

    return { 
      props: { 
        currentStory
      } 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { notFound: true };
  }
}