import { useState, useEffect, useCallback, useRef } from 'react';
import Question from './Question';

const Quiz = () => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
      correctAnswer: 'Mars',
    },
    // Add more questions as needed
  ];

  const QUESTION_TIME = 10; // seconds
  const TIMER_INTERVAL = 100; // milliseconds

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME * 1000);
  const [key, setKey] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    let timer;
    if (isQuizStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => Math.max(prev - TIMER_INTERVAL, 0)), TIMER_INTERVAL);
    } else if (isQuizStarted && timeLeft === 0) {
      handleNextQuestion(false);
    }
    return () => clearTimeout(timer);
  }, [isQuizStarted, timeLeft]);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setTimeLeft(QUESTION_TIME * 1000);
    setCurrentQuestionIndex(0);
    scoreRef.current = 0;
  };

  const handleNextQuestion = useCallback((isCorrect) => {
    if (isCorrect) {
      scoreRef.current += 1;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(QUESTION_TIME * 1000);
      setKey(prevKey => prevKey + 1);
    } else {
      endQuiz();
    }
  }, [currentQuestionIndex, questions.length]);

  const endQuiz = () => {
    setIsQuizStarted(false);
    alert(`Quiz finished! Your score is ${scoreRef.current} out of ${questions.length}`);
  };

  const renderProgressBars = () => {
    const currentProgress = ((QUESTION_TIME * 1000 - timeLeft) / (QUESTION_TIME * 1000)) * 100;
    
    return (
      <div className="w-full mb-4 flex space-x-2">
        {questions.map((_, index) => (
          <div key={index} className="flex-1 bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-100 ease-linear" 
              style={{ 
                width: index < currentQuestionIndex ? '100%' : 
                       index === currentQuestionIndex ? `${currentProgress}%` : '0%'
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  if (!isQuizStarted) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4">
        <button 
          onClick={startQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      {renderProgressBars()}
      <div className="mb-4 text-xl font-bold text-black">Time left: {Math.ceil(timeLeft / 1000)} seconds</div>
      <Question
        key={key}
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        correctAnswer={questions[currentQuestionIndex].correctAnswer}
        onAnswer={handleNextQuestion}
      />
    </div>
  );
};

export default Quiz;