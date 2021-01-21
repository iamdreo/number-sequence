import React from 'react';
import { render, screen, fireEvent, cleanup  } from '@testing-library/react';
import App from './App';

afterEach(cleanup)

test('screen renders without breaking', () => {
  render(<App />);
  const linkElement = screen.getByText(/Number Sequence/i);
  expect(linkElement).toBeInTheDocument();
});


test('text field changes when numbers are entered', () => {
  const handleChange = jest.fn();
  const { container } = render(<input type="text" onChange={handleChange} />);
  const input = container.firstChild;
  fireEvent.change(input, { target: { value: "a" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe("a");
})

