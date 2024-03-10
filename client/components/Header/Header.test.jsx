import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays the Header component with the correct amount of links', () => {
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();

    expect(navigation.children.length).toBe(1); 

    const practiceLink = screen.getByRole('link', { name: /Practice/i });
    expect(practiceLink).toBeInTheDocument();

  });
});
