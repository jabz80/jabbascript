import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { UserContext } from '../../contexts/User';
import Fighting from './Fighting';

expect.extend(matchers);

const UserContextProvider = ({ children, value }) => (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);

describe('Fighting', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders Fighting component with default values', () => {
    render(
      <BrowserRouter>
        <UserContextProvider value={{}}>
          <Fighting />
        </UserContextProvider>
      </BrowserRouter>
    );

    const leftFighterElement = screen.getByRole('fighter-one');
    expect(leftFighterElement).toBeInTheDocument();


    const rightFighterElement = screen.getByRole('fighter-two');
    expect(rightFighterElement).toBeInTheDocument();

    const timerElement = screen.queryByText(/:/); 
    expect(timerElement).toBeInTheDocument();

   
  });
});
