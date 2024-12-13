const TriviaCard = ({ question, answer, highlight, isFlipped, onFlip }) => {
  const handleFlip = () => {
    onFlip();
  };

  return (
    <div
      className={`
        min-w-80 h-52 perspective-1000 cursor-pointer relative 
          ${highlight ? 'z-[52]' : ''}
        `}
      onClick={!highlight ? handleFlip : () => {}}
    >
      <div
        className={`
          relative w-full h-full transition-all duration-1000 ease-flip transform-style-preserve-3d 
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        <div className={`absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-md bg-white`}>
          <h2 className={`text-xl font-bold p-4 text-center text-black `}>{question}</h2>
        </div>
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-md bg-white rotate-y-180">
          <h2 className="text-xl font-bold p-4 text-center text-black transition-all duration-1000">{answer}</h2>
        </div>
      </div>
    </div>
  );
};

export default TriviaCard;
