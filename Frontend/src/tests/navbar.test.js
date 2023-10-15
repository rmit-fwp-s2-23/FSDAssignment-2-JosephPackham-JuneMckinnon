import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/navbar';

test('renders navbar for non-signed in users', () => {
  // Render the Navbar component with no user
  render(
    <MemoryRouter>
      <Navbar setUser={jest.fn()} />
    </MemoryRouter>
  );

  // Assert that the correct information is displayed on the page
  expect(screen.getByTestId('Navbar-guest')).toBeInTheDocument();
  expect(screen.getByText('LOOP CINEMAS')).toBeInTheDocument();
  expect(screen.getByText('Welcome Guest')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
});

test('renders navbar for signed in users', () => {
  //Define the mock user object
  const user = {
    name: 'Test User',
  };

  const localStorageMock = {
    getItem: jest.fn(() => JSON.stringify(user)),
    removeItem: jest.fn(),
  };
  const setUserMock = jest.fn();

  window.confirm = jest.fn(() => true);

  // Render the Navbar component with the mock user object
  render(
    <MemoryRouter>
      <Navbar user={user} setUser={jest.fn()} />
    </MemoryRouter>
  );

  // Assert that the correct information is displayed on the page
  expect(screen.getByTestId('Navbar')).toBeInTheDocument();
  expect(screen.getByText('LOOP CINEMAS')).toBeInTheDocument();
  expect(screen.getByText(`Welcome ${user.name}`)).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByText('Log Out')).toBeInTheDocument();

  // Simulate a click on the Log Out button
  fireEvent.click(screen.getByText('Log Out'));

  // Assert that the user is logged out and redirected to the landing page
  expect(window.confirm).toBeCalledWith('Are you sure you want to logout?');
  expect(localStorage.getItem('loggedUser')).toBeNull();
  
});


