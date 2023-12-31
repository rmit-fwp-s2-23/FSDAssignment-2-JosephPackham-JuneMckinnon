import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reviews from '../pages/reviews';
import { getReviewsByMovie } from '../data/repository';
import { server } from './mocks/server.js';

// Start the mock server
server.listen();

test('renders reviews for a movie', async () => {
  // Define the mock props
  const movie = 'Test Movie';
  const user = {
    name: 'Test User',
    email: 'test@example.com',
  };

  // Define the mock window.prompt and window.alert functions
  window.prompt = jest.fn().mockReturnValue('Test review text');
  window.alert = jest.fn();

  // Get the reviews from the database by movie
  const reviews = await getReviewsByMovie(movie);

  // Check if the reviews are defined and have a length greater than 0
  expect(reviews).toBeDefined();
  expect(reviews.length).toBeGreaterThan(0);

  // Render the Reviews component with the mock props
  render(
    <MemoryRouter>
      <Reviews movie="Test Movie" user={{ name: 'Test User', email: 'test@example.com' }} />
    </MemoryRouter>
  );

  // Wait for the reviews to be rendered
  await waitFor(() => {
    const reviewElements = screen.getAllByTestId('review');
    expect(reviewElements.length).toBe(reviews.length);
  });

  // Simulate a click on the Edit button for the first review
  fireEvent.click(screen.getAllByText('Edit')[0]);

  // Assert that the prompt for editing the review is displayed
  expect(window.prompt).toBeCalledWith('Edit your review', 'Test review text');

  // Simulate a click on the Delete button for the second review
  fireEvent.click(screen.getAllByText('Delete')[1]);

  // Assert that the review can only be deleted by the user who created it
  expect(window.alert).toBeCalledWith('You can only delete your own reviews');
});

// Close the mock server after all tests have run
afterAll(() => {
  server.close();
});