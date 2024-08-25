import { render, screen } from '@testing-library/react'
import TriviaPage from '../trivia'
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders a heading', () => {
    const mockRouter = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
    };
  
    useRouter.mockImplementation(() => mockRouter);
    
    render(<TriviaPage />)
    const heading = screen.getByRole('heading', { name: /Trivia/i })
    expect(heading).toBeInTheDocument()
  })
})