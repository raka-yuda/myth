import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TriviaCard from '@/components/TriviaCard';

describe('TriviaCard', () => {
  const question = 'What is the capital of France?';
  const answer = 'Paris';

  test('renders the question and flips to show the answer', () => {
    const onFlipMock = jest.fn();
    const { getByText, container } = render(
      <TriviaCard question={question} answer={answer} isFlipped={false} onFlip={onFlipMock} />
    );

    expect(getByText(question)).toBeInTheDocument();

    fireEvent.click(getByText(question));

    expect(onFlipMock).toHaveBeenCalledTimes(1);
  });

  test('applies the "rotate-y-180" class when isFlipped is true', () => {
    const { container } = render(
      <TriviaCard question={question} answer={answer} isFlipped={true} onFlip={() => {}} />
    );

    expect(container.firstChild.firstChild).toHaveClass('rotate-y-180');
  });

  test('does not flip when highlight is true', () => {
    const onFlipMock = jest.fn();
    const { getByText, container } = render(
      <TriviaCard question={question} answer={answer} highlight={true} isFlipped={false} onFlip={onFlipMock} />
    );

    expect(getByText(question)).toBeInTheDocument();

    fireEvent.click(getByText(question));

    expect(onFlipMock).not.toHaveBeenCalled();
    
    expect(container.firstChild.firstChild).not.toHaveClass('rotate-y-180');
  });
});
