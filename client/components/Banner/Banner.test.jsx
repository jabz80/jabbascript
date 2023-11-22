import React from 'react';
import { screen, fireEvent, render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import Banner from './Banner';

describe('Banner', () => {

    beforeEach(() => {
        render(<BrowserRouter><Banner /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });
    
    it("Displays a Banner with appropriate text", () => {
        const banner = screen.getByRole('banner');
        expect(banner).toBeInTheDocument();

    });

    it("Banner displays the main heading", () => {

        const mainHeading = document.querySelector("h1");
        expect(mainHeading.textContent).toBe("Learn how to Code with Koding Kombat");
    });

    it('Banner has a subheading', () => { 
        const subheading = screen.getByRole('paragraph-first'); 
        expect(subheading).toBeInTheDocument(); 
        expect(subheading.textContent).toBe("Koding Kombat is a competitive programming game where two users engage in a battle of wits by answering challenging programming questions.") 
    })

    it("Banner has a p tag with game description", () => {
        const paragraph = screen.getByRole("paragraph-second");
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.innerHTML).toBe("<b>Players take turns tackling a series of coding challenges</b>, ranging from algorithmic puzzles to debugging exercises.");
    });

    it("Banner renders buttons with correct text content", () => {
        const storyModeButton = screen.getByRole("button", { name: /try story mode/i });
        const fightingModeButton = screen.getByRole("button", { name: /try fighting mode/i });
        const loginButton = screen.getByText("Login ›");
    
        expect(storyModeButton).toBeInTheDocument();
        expect(storyModeButton).toHaveTextContent("Try Quest");
    
        expect(fightingModeButton).toBeInTheDocument();
        expect(fightingModeButton).toHaveTextContent("Try Fighting ");
    
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveTextContent("Login ›");
    });

    it("Clicking on 'Try Quest' button navigates to the story page", () => {
        const storyModeButton = screen.getByRole("button", { name: /try story mode/i });
        fireEvent.click(storyModeButton);
        
    });

    it("Clicking on 'Fighting ' button navigates to the Fighting page", () => {
        const fightingModeButton = screen.getByRole("button", { name: /try fighting mode/i });
        fireEvent.click(fightingModeButton);
        
    });
})
