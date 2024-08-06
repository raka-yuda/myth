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
        <main className="container mx-auto px-4 py-12 h-full min-h-[100vh] flex items-center justify-center">
          <div className="flex-col justify-center">

            <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8">
              Welcome to Myth
            </h1>

            <p className="text-xl text-center text-gray-600 mb-12">
              A modern, responsive landing page built with Next.js and Tailwind CSS
            </p>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Feature
                title="Feature 1"
                description="Description of feature 1"
                icon="💡"
              />
              <Feature
                title="Feature 2"
                description="Description of feature 2"
                icon="🚀"
              />
              <Feature
                title="Feature 3"
                description="Description of feature 3"
                icon="🛠️"
              />
              <Feature
                title="Feature 4"
                description="Description of feature 4"
                icon="📊"
              />
              <Feature
                title="Feature 5"
                description="Description of feature 5"
                icon="🙏"
              />
              <Feature
                title="Feature 6"
                description="Description of feature 6"
                icon="🤣"
              />
              <Feature
                title="Feature 7"
                description="Description of feature 7"
                icon="🤢"
              />
              <Feature
                title="Feature 8"
                description="Description of feature 8"
                icon="🥶"
              />
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature
                title="Feature 1"
                description="Description of feature 1"
                icon="💡"
              />
              <Feature
                title="Feature 2"
                description="Description of feature 2"
                icon="🚀"
              />
              <Feature
                title="Feature 3"
                description="Description of feature 3"
                icon="🛠️"
              />
            </div>
          </div>
        </main>

      </div>
      {/* <footer className="text-center py-8 bg-gray-800 text-white">
      <a href="#" target="_blank" rel="noopener noreferrer">
        Powered by Next.js and Tailwind CSS
      </a>
    </footer> */}
    </div>
  );
}