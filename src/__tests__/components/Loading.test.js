import React from 'react';
import { render, act } from '@testing-library/react';
import Loading from '@/components/Loading'; 

jest.useFakeTimers();

describe('Loading', () => {
  it('should render with the initial state', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('display-text')).toHaveTextContent(''); 
  });

  it('should update the progress and text over time', () => {
    const { getByTestId } = render(<Loading text="loading" duration={1000} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId('display-text')).toHaveTextContent(/^[a-zA-Z!@#$%^&*()_+[\]{}|;:,.<>?]*$/);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId('display-text')).toHaveTextContent('loading');
  });

  it('should display the complete text after progress reaches 100%', () => {
    const { getByTestId } = render(<Loading text="done" duration={1000} completeDelay={500} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByTestId('display-text')).toHaveTextContent(/^[a-zA-Z!@#$%^&*()_+[\]{}|;:,.<>?]*$/);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId('display-text')).toHaveTextContent('done');
  });

  it('should render the ProgressBar with the correct progress', () => {
    const { getByTestId } = render(<Loading text="loading" duration={1000} />);
  
    act(() => {
      jest.advanceTimersByTime(500);
    });
  
    const progressBar = getByTestId('progress-bar');
    const progressBarStyle = window.getComputedStyle(progressBar);
    expect(progressBarStyle.width).toBe('50%');
  
    act(() => {
      jest.advanceTimersByTime(500);
    });
  
    const updatedProgressBarStyle = window.getComputedStyle(progressBar);
    expect(updatedProgressBarStyle.width).toBe('100%');
  });
  
});
