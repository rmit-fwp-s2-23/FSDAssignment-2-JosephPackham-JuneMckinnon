import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/landingpage';
import React, { useState, useEffect } from 'react';
import { server } from './mocks/server.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAllSessionTimes } from '../data/repository';

server.listen();

test('renders landing page with correct information', async () => {
  // Define the mock setMovie function
  const setMovie = jest.fn();

  // Fetch the session times data and update the state
  const sessionTimes = await getAllSessionTimes();
  expect(sessionTimes).toBeDefined();
  expect(sessionTimes.length).toBeGreaterThan(0);
  expect(sessionTimes[0].sessiontime_movie).toBeDefined();
  expect(sessionTimes[0].sessiontime_day).toBeDefined();
  expect(sessionTimes[0].sessiontime_time).toBeDefined();
  expect(sessionTimes[0].sessiontime_movie).not.toBeNull();
  expect(sessionTimes[0].sessiontime_day).not.toBeNull();
  expect(sessionTimes[0].sessiontime_time).not.toBeNull();

  // Render the LandingPage component with the mock setMovie function and session times state
  render(
    <MemoryRouter>
      <LandingPage setMovie={setMovie} sessionTimes={sessionTimes} />
    </MemoryRouter>
  );

  // Assert that the correct information is displayed on the page
  expect(screen.getByTestId('LandingPage')).toBeInTheDocument();
  expect(screen.getByTestId('MovieTitle')).toBeInTheDocument();
  expect(screen.getByTestId('MoviePoster')).toBeInTheDocument();
  expect(screen.getByTestId('ReviewButton')).toBeInTheDocument();
  expect(screen.getByTestId('SessionTimesHeading')).toBeInTheDocument();
  expect(screen.getByTestId('SessionTimes')).toBeInTheDocument();

  


});

//after all, close server
afterAll(() => {
  server.close();
});