import TriviaCard from '@/components/TriviaCard';
import Head from 'next/head'

import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";

export default function TriviaPage() {
  const trivia = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is 2 + 2?', answer: '4' },
    // Add more questions and answers here
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Myth | Trivia</title>
      </Head>

      <Navbar links={LINKS} />

      <main className="container mx-auto px-4 py-12 h-full min-h-[100vh] flex items-center justify-center">
        <div className="flex-col justify-center">

          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-16 mt-16 md:mt-0">
            Myth - Trivia
          </h1>

          {/* <p className="text-xl text-center text-gray-600 mb-12">
            A modern, responsive landing page built with Next.js and Tailwind CSS
          </p> */}
          {/* <div className="flex flex-col items-center justify-center w-full p-4 gap-2"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trivia.map((item, index) => (
              <TriviaCard key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}