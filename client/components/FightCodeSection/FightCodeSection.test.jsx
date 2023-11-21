import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from '../../contexts/Auth';
import FightCodeSection from './FightCodeSection';

describe('FightCodeSection', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    cleanup();
    mock.reset();
  });

  it('renders FightCodeSection with fight result', () => {
    const authToken = 'fakeAuthToken';
    const fightResult = 'You won!';

    render(
      <AuthContext.Provider value={{ authToken }}>
        <BrowserRouter>
          <FightCodeSection
            setPythonCode={() => {}}
            pythonCode=""
            checkTheAnswer={() => {}}
            questions={[]}
            currentQuestionIndex={0}
            fightResult={fightResult}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('You won!')).toBeInTheDocument();
  });

  it('renders FightCodeSection without fight result', () => {
    const authToken = 'fakeAuthToken';

    render(
      <AuthContext.Provider value={{ authToken }}>
        <BrowserRouter>
          <FightCodeSection
            setPythonCode={() => {}}
            pythonCode=""
            checkTheAnswer={() => {}}
            questions={[{ question: 'What is your quest?' }]}
            currentQuestionIndex={0}
            fightResult={null}
          />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Round 1/1')).toBeInTheDocument();
    expect(screen.getByText('What is your quest?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check' })).toBeInTheDocument();
  });


});
