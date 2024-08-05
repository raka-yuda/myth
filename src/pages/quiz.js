import { Inter } from "next/font/google";
import Head from 'next/head'

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Myth | Quiz</title>
        <meta name="description" content="Welcome to my landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar links={LINKS} />

      <main className="container mx-auto px-4 py-12 h-full min-h-[100vh] flex items-center justify-center">
        <div className="flex-col justify-center">
          
          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8">
            Quiz Page
          </h1>

          <p className="text-xl text-center text-gray-600 mb-12">
            A modern, responsive landing page built with Next.js and Tailwind CSS
          </p>

          <Quiz/>
        </div>
      </main>
    </div>
  );
}