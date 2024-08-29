import React from 'react';
import { useRouter } from 'next/router'
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Navbar from '@/components/Navbar';
import LINKS from "@/constants/links";


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


describe('Navbar', () => {
  const logo = '🗿';

  useRouter.mockReturnValue({ 
    query: {},
    pathname: "/"
  });

  test('should renders the navbar with logo properly', () => {
    const { getByText } = render(<Navbar links={LINKS}/>);

    expect(getByText(logo)).toBeInTheDocument();
  });

  test('should renders the navbar with link properly', () => {
    const { getByTestId } = render(<Navbar links={LINKS}/>);
    
    const listLink = within(getByTestId('links')).queryAllByRole("link");
    
    listLink.forEach((link, index) => {
      expect(link).toHaveTextContent(LINKS[index]["label"])
    })
  });
});