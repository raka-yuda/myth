import TriviaCard from '@/components/TriviaCard';

const Home = () => {
  const trivia = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
    // Add more questions and answers here
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-4">
      <h1 className="text-4xl mb-8">Trivia App</h1>
      <div className="grid grid-cols-1 gap-4">
        {trivia.map((item, index) => (
          <TriviaCard key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default Home;
