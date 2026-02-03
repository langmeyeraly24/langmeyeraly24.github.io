# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Alyssa Langmeyer (Data Science & Policy Analyst), built with Quarto and deployed to GitHub Pages at `langmeyeraly24.github.io`.

## Build Commands

```bash
# Build the site (outputs to _site/)
quarto render

# Preview with live reload
quarto preview

# Render a single page
quarto render index.qmd
```

## Architecture

**Quarto Website**: The site uses Quarto's website project type with `.qmd` files as source content.

**Key Files**:
- `index.qmd` - Main landing page with hero, about, experience, projects, skills, education, and contact sections (single-page design with anchor navigation)
- `resume.html` - Standalone resume page with print-to-PDF functionality (not rendered by Quarto)
- `style.css` - Main stylesheet with CSS custom properties for theming (light/dark mode support)
- `script.js` - Client-side interactivity (theme toggle, mobile nav, scroll animations, intersection observers)

**Output**: Built site goes to `_site/` directory. Quarto caches are in `.quarto/`.

## Styling System

The site uses CSS custom properties defined in `style.css`:
- Light/dark theme via `[data-theme="dark"]` selector
- Gradient-based color scheme (blue → purple → pink)
- Responsive breakpoints at 1024px, 768px, and 480px
- CSS variables for spacing, typography, transitions, and shadows

## Content Sections

The main `index.qmd` contains embedded HTML for a custom single-page portfolio layout with these sections:
- Hero with animated greeting and social links
- About with stats grid
- Experience timeline
- Projects grid with featured cards
- Skills categories
- Education cards
- Contact methods

## Writing Samples

PDF documents in `Writing Samples/` directory are academic papers referenced from the portfolio.
