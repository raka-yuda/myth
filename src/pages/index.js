import { Inter } from "next/font/google";
import Head from 'next/head'
import Feature from '../components/Feature'

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllMyths } from "@/services/myths";


const inter = Inter({ subsets: ["latin"] });

function getRandomElements(arr, num) {
  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Return the first `num` elements from the shuffled array
  return arr.slice(0, num);
}


export default function Home({myths}) {

  // const myths = [
  //   {
  //     id: "legenda-danau-toba",
  //     title: "Legenda Danau Toba",
  //     synopsis: "Seorang pemuda bernama Toba menikahi seorang putri ikan. Mereka memiliki seorang anak, tapi Toba melanggar janji yang dibuat dengan istrinya, menyebabkan terjadinya bencana besar yang membentuk Danau Toba.",
  //     full_story: "",
  //     background_image: "",
  //   },
  //   {
  //     id: "legenda-malin-kundang",
  //     title: "Legenda Malin Kundang",
  //     synopsis: "Seorang pemuda bernama Malin Kundang durhaka kepada ibunya setelah menjadi kaya. Karena itu, dia dikutuk menjadi batu oleh ibunya.",
  //     full_story: "",
  //     background_image: "",
  //   },
  //   {
  //     id: "legenda-roro-jonggrang",
  //     title: "Legenda Roro Jonggrang",
  //     synopsis: "Seorang putri cantik bernama Roro Jonggrang meminta seorang pangeran untuk membangun seribu candi dalam semalam sebagai syarat pernikahan. Pangeran hampir berhasil, tapi Roro Jonggrang menggagalkan usahanya.",
  //     full_story: "",
  //     background_image: "",
  //   },
  // ];

  return (
    <div>
      <Head>
        <title>Myth | Home</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar links={LINKS} />
        <main className="container max-w-7xl mx-auto px-4 pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
          <div className="flex-col justify-center max-w-7xl h-full md:pt-36">

            <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800 mb-12 mt-16 md:mt-0">
              Myth
            </h1>

            {/* <p className="text-xl text-center text-gray-600 mb-12">
              A modern, responsive landing page built with Next.js and Tailwind CSS
            </p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myths && myths.map((story) => (
                <div key={`story-${story.id.english}`} className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center" style={{ backgroundImage: `url('your-image-url.jpg')` }}>
                  <div className="flex flex-col rounded border-2 border-white p-4 h-full justify-between">
                    <p className="text-xl text-gray-600 mb-24">
                      {story.title.english}
                    </p>
                    <p className="text-xl text-gray-600 mb-2">
                      Synopsis:
                    </p>
                    <p className="text-xl text-gray-600 mb-6 line-clamp-5">
                      {story.synopsis.english}
                    </p>
                    <Link
                      href={`/story/${story.id.english}`} 
                      className="text-base text-end text-gray-600 mb-2 hover:underline"
                    >
                      Read More...
                    </Link>
                  </div>
                </div>
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
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const myths = await fetchAllMyths();

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