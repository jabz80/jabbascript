import React from 'react';
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import AnswerFormOutput from './AnswerFormOutput';

describe('AnswerFormOutput', () => {

    afterEach(() => {
        cleanup();
    });

  it('renders with default message when no pythonCode is provided', () => {
    render(<AnswerFormOutput />);
    
    const defaultMessageElement = screen.getByText('Your Answer will be here');
    expect(defaultMessageElement).toBeInTheDocument();
  });

  it('renders pythonCode when provided', () => {
    const pythonCode = 'print("Hello, World!")';
    render(<AnswerFormOutput pythonCode={pythonCode} />);
    
    const codeOutputElement = screen.getByRole('code-output');
    expect(codeOutputElement).toBeInTheDocument();
    expect(codeOutputElement).toHaveTextContent(pythonCode);
  });
});


