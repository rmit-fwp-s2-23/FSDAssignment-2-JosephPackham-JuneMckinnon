import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/landingpage';
import React, { useState, useEffect } from 'react';
import { server } from './mocks/server.js';
import { render, screen, waitFor , within} from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAllSessionTimes, getAllMovies } from '../data/repository';

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

  // Fetch the movies data and update the state
  const movies = await getAllMovies();
  console.log(movies);
  expect(movies).toBeDefined();
  expect(movies.length).toBeGreaterThan(0);
  expect(movies[0].movie_name).toBeDefined();
  expect(movies[0].movie_image).toBeDefined();
  expect(movies[0].movie_name).not.toBeNull();
  expect(movies[0].movie_image).not.toBeNull();

  //set movie to the first movie in the movies array
  setMovie(movies[0]);
  const movie = movies[0];
 


  // Render the LandingPage component with the mock setMovie function and session times state
  render(
    <MemoryRouter>
      <LandingPage setMovie={setMovie} sessionTimes={sessionTimes} movie={movie.movie_name} />
    </MemoryRouter>
  );

  await waitFor(() => {
    const movieElements = screen.getAllByTestId('movie');
    expect(movieElements.length).toBe(movies.length);
  });

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