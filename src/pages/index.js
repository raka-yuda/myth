import Image from "next/image";
import { Inter } from "next/font/google";
import Head from 'next/head'
import Feature from '../components/Feature'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="Welcome to my landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12 h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8">
          Welcome to My Landing Page
        </h1>

        <p className="text-xl text-center text-gray-600 mb-12">
          A modern, responsive landing page built with Next.js and Tailwind CSS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
      </main>

      {/* <footer className="text-center py-8 bg-gray-800 text-white">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by Next.js and Tailwind CSS
        </a>
      </footer> */}
    </div>
  );
}