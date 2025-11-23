# GitHub Copilot Instructions for This Repository

These instructions tell GitHub Copilot and other AI coding assistants
how to generate code for this repository.\
They define the required architecture, conventions, and patterns for the
**Stock Screener using the Financial Modeling Prep API and Yahoo Finance
API**.

------------------------------------------------------------------------

# 🎯 Project Overview

This repository contains a full-stack TypeScript application with:

## Backend

-   Node.js (ESM)
-   Express
-   Axios
-   Financial Modeling Prep API (FMP)
-   Yahoo Finance API
-   CORS
-   dotenv
-   TypeScript executed via `tsx` during development

## Frontend

-   React (TypeScript)
-   Vite
-   React Testing Library
-   Vitest

## Tests

-   Vitest for UI + coverage
-   TSX-based Node tests for backend logic and API clients
-   JSDOM for DOM testing
-   External dependencies must be mocked in tests

This project focuses heavily on backend logic (screeners, analyzers, API
integrations) with a lightweight optional frontend.

------------------------------------------------------------------------

# 📁 Project Structure Conventions

## Backend (API + Screener Engine)

    /api/src
      /clients        → FMP and Yahoo Finance API wrappers
      /core           → Screeners, analyzers, and scoring engines
      /models         → Types & interfaces for stock data
      /utils          → Helpers (math, date, formatting)
      index.ts        → Main backend entrypoint (dev via tsx)
      cli.ts          → CLI entry for running screeners
      examples-*.ts   → Example scripts demonstrating usage

## Express Server

    /server.ts        → Express app + API routes

## Frontend

    /src
      /components     → UI components
      /hooks          → Data-fetching hooks (optional)
      /services       → Client for hitting backend routes
      main.tsx
      App.tsx

## Tests

    /tests
      screener.test.ts
      analyzer.test.ts
      fmp-client.test.ts
      server.test.ts
      components.test.ts

Copilot should match these patterns whenever generating new code.

------------------------------------------------------------------------

# 🧱 Architecture Rules

### General

-   All source code must be **TypeScript**.
-   Use **ES modules** (`"type": "module"` is set).
-   Always use **named exports** (never default exports).
-   Keep functions small and pure unless the logic requires state.
-   Avoid side effects in the screener engine.

### Backend Rules

-   Express routes should be simple:
    -   validate input\
    -   call core functions\
    -   return JSON\
-   All remote API calls live only inside `/api/src/clients`.

### Screener Engine Rules

-   Screening logic belongs strictly in `/api/src/core/…`.
-   Analyzer functions must:
    -   be pure\
    -   accept cleaned data\
    -   return metrics, scores, or signals\
-   CLI (`cli.ts`) provides a non-HTTP way to run screeners.

### Frontend Rules

-   Keep components functional.
-   Use TypeScript types for props and state.
-   Avoid mixing business logic into components.

------------------------------------------------------------------------

# 🌐 API Standards

### Express Server

Typical endpoints the server should expose: - `/api/screen` -
`/api/stocks/:symbol` - `/api/health`

All responses must follow this structure:

### Success

``` json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Error

``` json
{
  "success": false,
  "data": null,
  "error": {
    "message": "string",
    "code": "string"
  }
}
```

### API Client Rules

-   Axios must be used for all HTTP requests.
-   API keys must come from environment variables.
-   Clients must handle errors gracefully and return typed results.

------------------------------------------------------------------------

# 🔑 Environment Variables

Use dotenv and `.env`:

    FMP_API_KEY=your_key_here
    PORT=3000

Copilot must **never** hardcode secrets or put fake values in code.

------------------------------------------------------------------------

# 🧪 Testing Standards

### Backend Tests (run via tsx)

-   Directly test:
    -   analyzer functions
    -   screener logic
    -   FMP client
    -   Yahoo client
    -   server responses (using fetch mocking or similar patterns)
-   Prefer testing pure functions directly in `/api/src/core`.

### Frontend Tests (Vitest + Testing Library)

-   Use JSDOM environment.
-   Focus on behavioral tests.
-   Keep UI tests simple and stable.
-   Prefer Testing Library best practices:
    -   use `screen`
    -   avoid testing implementation details
    -   test user interactions

------------------------------------------------------------------------

# 🛠 Code Style Rules

Copilot should follow: - `async/await` for all asynchronous code -
Strong typing (avoid `any`) - Meaningful function names - Comments for
non-obvious financial logic - Small modules grouped by responsibility -
Clean and predictable folder structure

------------------------------------------------------------------------

# 🤝 Frontend ↔ Backend Interaction

Frontend should: - Call Express endpoints (not FMP directly) - Use Axios
for HTTP requests - Use type-safe interfaces for server responses -
Isolate API calls inside `/src/services`

------------------------------------------------------------------------

# 🧩 Copilot MUST Always

-   Use named exports.
-   Keep architecture layers separate.
-   Generate pure functions for analysis logic.
-   Add TODO comments when developer input is needed.
-   Ask for clarification if instructions are incomplete.
-   Generate proper TypeScript types for all data.
-   Keep API client logic out of analyzer logic.
-   Treat the CLI, server, and core modules as separate entrypoints.

------------------------------------------------------------------------

# 🚫 Copilot MUST Never

-   Use default exports.
-   Hardcode API keys.
-   Mix concerns (e.g., FMP calls inside analyzer functions).
-   Write JavaScript instead of TypeScript.
-   Introduce databases or ORMs (this project is API-driven).
-   Add new dependencies without the developer explicitly requesting it.
-   Move screener logic into server routes.
-   Create large multipurpose files.

------------------------------------------------------------------------

# 🔄 Git & PR Expectations

-   Small, focused commits.
-   Keep file structure intact.
-   Update tests when algorithms or API behaviors change.
-   Maintain clear separation of:
    -   clients\
    -   core logic\
    -   utilities\
    -   server\
    -   UI

------------------------------------------------------------------------

# 📘 Final Notes

This project centers on: - Clean, well-typed TypeScript\
- Strong separation between analysis, API clients, and web server\
- A reliable, extendable stock screener engine\
- Light optional UI for displaying results

Copilot must prioritize clarity, strong typing, modularity, and
predictable architecture.
