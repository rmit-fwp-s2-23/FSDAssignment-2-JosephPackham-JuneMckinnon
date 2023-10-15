/**
* @vitest-environment jsdom
*/

import { MemoryRouter } from 'react-router-dom';
import UserProfile from '../pages/userprofile';
import React from 'react';
import { server } from './mocks/server.js';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { findUserByEmail } from '../data/repository';

/* 
 - make sure to name test files same as the page they are testing
*/

// tells the server to start intercepting api calls
server.listen();

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

test('renders user profile with correct information', async () => {

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ 
    email: "june@email.com",
    joined: "10/10/2023",
    name: "June", }));

    render(
        <MemoryRouter>
            <UserProfile />
        </MemoryRouter>
    )
  
    // Wait for the component to fetch user data
    await screen.findByText(/June's Profile/i);
  
    // Assert that user information is displayed on the page
    expect(screen.getByText(/Username: June/i)).toBeInTheDocument();
    expect(screen.getByText(/Email: june@email.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Joined: 10\/10\/2023/i)).toBeInTheDocument();
});

afterAll(() => {
    server.close();
});

// after wrting all your tests when you run 'npm test' it will automatically run all test files
// you need to scroll all the way up to look at the error given for a test failing