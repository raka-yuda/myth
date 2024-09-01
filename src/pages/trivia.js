import { useEffect, useState } from 'react';
import TriviaCard from '@/components/TriviaCard';
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import { Shuffle } from 'lucide-react';

export default function TriviaPage() {
  const [showHint, setShowHint] = useState(false);
  const [currentTrivia, setCurrentTrivia] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const trivia = [
    { question: 'In the Legend of Lake Toba, what was the condition given by the fish princess to marry Toba?', answer: 'Never tell anyone about her origin' },
    { question: 'What natural formation was created as a result of the events in the Legend of Lake Toba?', answer: 'Lake Toba' },
    { question: 'In the Legend of Malin Kundang, what happened to Malin after he disrespected his mother?', answer: 'He was turned into stone' },
    { question: 'What impossible task did Roro Jonggrang ask Bandung Bondowoso to complete in one night?', answer: 'Build a thousand temples' },
    { question: 'In the Legend of Tangkuban Perahu, what relation was Sangkuriang to Dayang Sumbi?', answer: 'Her son' },
    { question: 'What does "Tangkuban Perahu" mean in English?', answer: 'Overturned boat' },
    { question: 'In the Legend of Timun Mas, what were the four items given to Timun Mas to help her escape the giant?', answer: 'Cucumber seeds, needles, salt, and shrimp paste' },
    { question: 'What creature was Princess Candra Kirana cursed to become in the Legend of Keong Mas?', answer: 'A golden snail' },
    { question: 'In the Legend of Banyuwangi, what happened when Sritanjung threw herself into the river?', answer: 'The water became clear and fragrant' },
  ];

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setShowHint(true);
      localStorage.setItem('firstVisit', 'false');
    }
    shuffleTrivia();
  }, []);

  const handleDismissHint = () => {
    setShowHint(false);
  };

  const shuffleTrivia = () => {
    setIsShuffling(true);
    const shuffled = [...trivia].sort(() => Math.random() - 0.5);
    setCurrentTrivia(shuffled.slice(0, 3));
    setFlippedCards({});
    setTimeout(() => setIsShuffling(false), 500);
  };

  const handleCardFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

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

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-8`}>
            {currentTrivia.map((item, index) => (
              <div key={index} className={`transition-all duration-500 ${isShuffling ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${showHint ? 'z-[52]' : ''}`}>
                <TriviaCard 
                  question={item.question} 
                  answer={item.answer} 
                  highlight={showHint}
                  isFlipped={flippedCards[index]}
                  onFlip={() => handleCardFlip(index)}
                />
              </div>
            ))}
          </div>

          {!showHint && <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
              onClick={shuffleTrivia}
            >
              <Shuffle size={24} />
              <span>Shuffle Questions</span>
            </button>
          </div>}

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