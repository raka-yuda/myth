import { render, screen } from '@testing-library/react'
import HomePage from '../index'
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
    
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /Myth/i })
    expect(heading).toBeInTheDocument()
  })
})