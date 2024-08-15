import { useEffect, useState } from 'react';
import TriviaCard from '@/components/TriviaCard';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";

export default function TriviaPage() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setShowHint(true);
      localStorage.setItem('firstVisit', 'false');
    }
  }, []);

  const handleDismissHint = () => {
    setShowHint(false);
  };

  const trivia = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is 2 + 2?', answer: '4' },
    // Add more questions and answers here
  ];

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>Trivia | Myth</title>
      </Head>

      <Navbar links={LINKS} />

      <main className="container mx-auto px-4 py-12 h-full min-h-[100vh] flex items-center justify-center">
        <div className="flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-16 mt-16 md:mt-0">
            Myth - Trivia
          </h1>

          {showHint && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[51]"/>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trivia.map((item, index) => (
              <TriviaCard key={index} question={item.question} answer={item.answer} highlight={showHint} />
            ))}
          </div>
          {showHint && (
            <div className="absolute inset-0 flex flex-col items-center md:justify-center z-[51]">
                <p className="text-lg font-semibold md:mt-[30rem] mt-24 mb-4 text-white">Tap a card to see the answer!</p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleDismissHint}
                >
                  Got it!
                </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
