import { Inter } from "next/font/google";
import Head from 'next/head'

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Quiz | Myth</title>
      </Head>

      <Navbar links={LINKS} />

      <main className="container mx-auto px-4 py-12 h-full min-h-[100vh] max-w-xl flex items-center justify-center bg-white">
        <div className="flex-col justify-center w-full">
          
          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-16 mt-16 md:mt-0">
            Myth - Quiz
          </h1>

          {/* <p className="text-xl text-center text-gray-600 mb-12">
            Let's do some game on mythical world!
          </p> */}

          <Quiz/>
        </div>
      </main>
    </div>
  );
}