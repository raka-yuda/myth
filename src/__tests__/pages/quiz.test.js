import { render, screen } from '@testing-library/react'
import QuizPage from '@/pages/quiz'
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
    
    render(<QuizPage />)
    const heading = screen.getByRole('heading', { name: /Quiz/i })
    expect(heading).toBeInTheDocument()
  })
})