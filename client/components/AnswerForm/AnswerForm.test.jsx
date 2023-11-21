import React from 'react';
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AnswerForm from './AnswerForm';

describe('AnswerForm', () => {
    it('renders the code editor and run button', () => {
        render(<AnswerForm setPythonCode={() => {}} />);
    
        const editor = screen.getByRole('textbox');
        const runButton = screen.getByRole('button');
    
        expect(editor).toBeInTheDocument();
        expect(runButton).toBeInTheDocument();
      });

   
})