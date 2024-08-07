import { useState } from 'react';

const TriviaCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="min-w-80 h-52 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div 
        className={`
          relative w-full h-full 
          transition-all duration-1000 ease-flip transform-style-preserve-3d 
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-md bg-gray-100">
          <h2 className="text-xl font-bold p-4 text-center text-black">{question}</h2>
        </div>
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-md bg-gray-200 rotate-y-180">
          <p className="text-lg p-4 text-center text-black">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default TriviaCard;