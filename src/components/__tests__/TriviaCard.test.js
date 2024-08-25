import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TriviaCard from '../TriviaCard';

describe('TriviaCard', () => {
  const question = 'What is the capital of France?';
  const answer = 'Paris';

  test('renders the question and flips to show the answer', () => {
    const { getByText, container } = render(<TriviaCard question={question} answer={answer} />);

    expect(getByText(question)).toBeInTheDocument();

    fireEvent.click(getByText(question));

    expect(container.firstChild.firstChild).toHaveClass('rotate-y-180');
  });

  test('does not flip when highlight is true', () => {
    const { getByText, container } = render(<TriviaCard question={question} answer={answer} highlight={true} />);

    expect(getByText(question)).toBeInTheDocument();

    fireEvent.click(getByText(question));

    expect(container.firstChild.firstChild).not.toHaveClass('rotate-y-180');
  });
});