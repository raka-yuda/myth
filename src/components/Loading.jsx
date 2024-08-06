import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const Loading = ({ text = 'loading', duration = 3000, completeDelay = 500 }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        const revealLength = Math.floor((newProgress / 100) * text.length);
        const revealedText = text.slice(0, revealLength);
        const scrambledText = revealedText + scramble(text.slice(revealLength));
        setDisplayText(scrambledText);

        return newProgress;
      });
    }, duration / 100);

    if (progress === 100) {
      setTimeout(() => setDisplayText(text), completeDelay);
    }

    return () => clearInterval(interval);
  }, [text, duration, progress, completeDelay]);

  const scramble = (text) => {
    const chars = '!@#$%^&*()_+[]{}|;:,.<>?';
    return text.split('').map(char => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black ">
      <div className="text-2xl mb-4">{displayText}</div>
      {/* <div className="text-xl">{progress}%</div> */}
      <div className="w-[25%]">
        <ProgressBar progress={progress}/>
      </div>
    </div>
  );
};

export default Loading;
