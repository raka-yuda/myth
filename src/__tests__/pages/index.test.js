import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '@/pages/index'
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders a heading', async () => {
    const mockRouter = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
    };
  
    useRouter.mockImplementation(() => mockRouter);

    const mockMyths = [
      {
        title: { english: 'Test Myth', indonesian: 'Uji Mitos' },
        synopsis: { english: 'Test synopsis', indonesian: 'Uji Sinopsis' },
        id: { english: 'test-myth', indonesian: 'uji-mitos' }
      }
    ];
    
    render(<HomePage myths={mockMyths} />)

    await waitFor(() => {
      const heading = screen.getByTestId('main-heading');
      expect(heading).toHaveTextContent('Myth');
    }, { timeout: 2000 });
  })
})