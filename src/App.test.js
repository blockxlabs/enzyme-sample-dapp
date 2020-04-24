import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Enzyme Sample DApp', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Enzyme Sample DApp/i);
  expect(linkElement).toBeInTheDocument();
});
