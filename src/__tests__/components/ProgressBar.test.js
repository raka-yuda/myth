import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '@/components/ProgressBar';

describe('ProgressBar', () => {
  it('should render with the default height and progress of 0%', () => {
    const { container } = render(<ProgressBar />);
    const outerDiv = container.firstChild; 
    const progressBar = outerDiv.firstChild; 
    
    expect(progressBar).toHaveClass('h-1');

    expect(progressBar).toHaveStyle('width: 0%');
  });

  it('should apply the correct height class', () => {
    const { container } = render(<ProgressBar height="h-4" />);
    const progressBar = container.querySelector('div > div');

    expect(progressBar).toHaveClass('h-4');
  });

  it('should set the width according to the progress prop', () => {
    const { container } = render(<ProgressBar progress={50} />);
    const outerDiv = container.firstChild; 
    const progressBar = outerDiv.firstChild; 

    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('should handle edge cases for progress values', () => {
    const { container } = render(<ProgressBar progress={100} />);
    const outerDiv = container.firstChild; 
    const progressBar = outerDiv.firstChild; 
    expect(progressBar).toHaveStyle('width: 100%');

    const { container: containerNegative } = render(<ProgressBar progress={-10} />);
    const outerDivNegative = containerNegative.firstChild; 
    const progressBarNegative = outerDivNegative.firstChild; 
    expect(progressBarNegative).toHaveStyle('width: -10%');
  });
});
