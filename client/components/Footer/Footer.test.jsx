import React from "react";
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Footer from "./Footer";


describe ("Footer", () => {

    beforeEach(() => {
        render(<BrowserRouter><Footer /></BrowserRouter>); // renders the footer component for each test cases within the test suite
    });

    it("Displays a Footer with appropriate text", () => {
        const footer = screen.getByRole('footer');
        expect(footer).toBeInTheDocument();
        expect(footer.textContent).toBe("2023 © JabbaScript™")
    });
})