// Import the necessary modules and components
import { MemoryRouter } from 'react-router-dom';
import UserProfile from '../pages/userprofile';
import React from 'react';
import { server } from './mocks/server.js';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { findUserByEmail } from '../data/repository';

// Start the mock server
server.listen();

// Define the mock localStorage object
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// Set the global localStorage object to the mockLocalStorage object
Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

// Define the test case
test('renders user profile with correct information', async () => {
  // Set the mock localStorage object to return a mock user object
  mockLocalStorage.getItem.mockReturnValue(
    JSON.stringify({
      email: 'june@email.com',
      joined: '10/10/2023',
      name: 'June',
    })
  );

  // Render the UserProfile component with the mock localStorage object
  render(
    <MemoryRouter>
      <UserProfile />
    </MemoryRouter>
  );

  // Wait for the component to fetch user data
  await screen.findByText(/June's Profile/i);

  // Assert that user information is displayed on the page
  expect(screen.getByText(/Username: June/i)).toBeInTheDocument();
  expect(screen.getByText(/Email: june@email.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Joined: 10\/10\/2023/i)).toBeInTheDocument();
});

// Close the mock server after all tests have run
afterAll(() => {
  server.close();
});