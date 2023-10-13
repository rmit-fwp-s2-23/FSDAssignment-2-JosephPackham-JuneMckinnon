import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { server } from './mocks/server.js';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { findUserByEmail } from '../data/repository';
import SignUp from '../pages/signup';
import { createUser } from '../data/repository';

server.listen();



const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

test('renders Sign Up page with correct information', async () => {

    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ email: 'june@email.com'}));

    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
    )

    // Wait for the component to fetch user data
    await screen.findByText(/Welcome to Loop Cinemas!/i);

    // Assert that user information is displayed on the page
    expect(screen.getByText(/Welcome to Loop Cinemas!/i)).toBeInTheDocument();
    expect(screen.getByTestId('Name')).toBeInTheDocument();
    expect(screen.getByTestId('Email')).toBeInTheDocument();
    expect(screen.getByTestId('Password')).toBeInTheDocument();
    expect(screen.getByTestId('SignUp')).toBeInTheDocument();


  });

 
afterAll(() => {
    server.close();
} );