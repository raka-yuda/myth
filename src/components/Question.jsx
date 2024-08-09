import { useState } from 'react';

const Question = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onAnswer(option === correctAnswer);
  };

  return (
    <div className="bg-white w-full mx-auto">
      <div className="py-12 px-12 border rounded-md mb-6">
        <h2 className="text-2xl font-bold text-center text-black">{question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-12 px-12 border rounded-md text-center text-black ${
              selectedOption === option
                ? option === correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
