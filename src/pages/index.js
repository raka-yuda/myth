import { Inter } from "next/font/google";
import Head from 'next/head'
import Feature from '../components/Feature'

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });


export default function Home() {

  return (
    <div>
      <Head>
        <title>Myth | Home</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar links={LINKS} />
        <main className="container max-w-7xl mx-auto px-4 pt-12 h-full min-h-[100vh] flex flex-col items-center justify-between">
          <div className="flex-col justify-center max-w-7xl h-full md:py-24">

            <h1 className="text-4xl md:text-6xl font-bold text-start text-gray-800 mb-12 mt-16 md:mt-0">
              Myth
            </h1>

            {/* <p className="text-xl text-center text-gray-600 mb-12">
              A modern, responsive landing page built with Next.js and Tailwind CSS
            </p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center" style={{ backgroundImage: `url('your-image-url.jpg')` }}>
                <div className="rounded border-2 border-white p-4 h-full">
                  <p className="text-xl text-gray-600 mb-24">
                    Legenda Danau Toba
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Sinopsis:
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Seorang pemuda bernama Toba menikahi seorang putri ikan. Mereka memiliki seorang anak, tapi Toba melanggar janji yang dibuat dengan istrinya, menyebabkan terjadinya bencana besar yang membentuk Danau Toba.
                  </p>
                </div>
              </div>
              <div className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center" style={{ backgroundImage: `url('your-image-url.jpg')` }}>
                <div className="rounded border-2 border-white p-4 h-full">
                  <p className="text-xl text-gray-600 mb-24">
                    Legenda Malin Kundang
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Sinopsis:
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Seorang pemuda bernama Malin Kundang durhaka kepada ibunya setelah menjadi kaya. Karena itu, dia dikutuk menjadi batu oleh ibunya.
                  </p>
                </div>
              </div>
              <div className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center" style={{ backgroundImage: `url('your-image-url.jpg')` }}>
                <div className="rounded border-2 border-white p-4 h-full">
                  <p className="text-xl text-gray-600 mb-24">
                    Legenda Roro Jonggrang
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Sinopsis:
                  </p>
                  <p className="text-xl text-gray-600 mb-2">
                    Seorang putri cantik bernama Roro Jonggrang meminta seorang pangeran untuk membangun seribu candi dalam semalam sebagai syarat pernikahan. Pangeran hampir berhasil, tapi Roro Jonggrang menggagalkan usahanya.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer className="flex self-end text-center py-8 text-black">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Made by ❤️
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}