import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AnswerForm from './AnswerForm';


describe('AnswerForm', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('renders the code editor and run button', () => {
    const { getByRole } = render(<AnswerForm setPythonCode={() => {}} />);

    const editor = getByRole('textbox');
    const runButton = getByRole('button');

    expect(editor).toBeInTheDocument();
    expect(runButton).toBeInTheDocument();
  });

});
