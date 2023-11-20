import React from 'react';
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import { UserContext } from '../../contexts/User';
import Fighter from './Fighter';


const UserContextProvider = ({ children, value }) => (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);

describe('Fighter', () => {
    const mockUserData = {
      username: 'JohnDoe',
      img_url: 'user-image.png',
    };
  
    it('Renders Fighter component with user data', () => {
      const contextValue = {
        userData: mockUserData,
      };
  
      render(
        <UserContextProvider value={contextValue}>
          <Fighter
            firstFighter={true}
            robot={false}
            roundWinner={1}
            healthPlayerOne={80}
            healthPlayerTwo={60}
          />
        </UserContextProvider>
      );
  
      const usernameElement = screen.getByText(mockUserData.username);
      expect(usernameElement).toBeInTheDocument();
  
    
    });
  

    it('Renders a progress Bar', () => {
        const healthBarElement = screen.getByRole('progressbar');
        expect(healthBarElement).toBeInTheDocument();
    })

    it('Renders a background Image', () => {
        const backgroundElement = screen.getByRole('background');
        expect(backgroundElement).toBeInTheDocument();
        expect(backgroundElement).toHaveStyle('backgroundImage: url(user-image.png)');
    })

});
