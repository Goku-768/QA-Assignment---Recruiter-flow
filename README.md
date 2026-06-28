# QA-Assignment---Recruiter-flow
Contains a test suite for the QA Assignment


## Setup

```bash
npm install
npx playwright install chromium

## Running tests

```bash
npm test                                      # run all tests
npx playwright test --headed                  # with browser visible
npx playwright show-report                    # open last HTML report
```

> **Note:** Before running the API tests, replace `API_TOKEN` in [tests/api/users.spec.ts](tests/api/users.spec.ts) with your own key from reqres.in — the tests will fail with a 401 otherwise.

## What's covered

**UI** (`tests/ui/maintest.spec.ts`)
- Login — standard user and locked-out user
- Cart — add items, check badge count, sort by price
- Checkout — full flow from login to order confirmation

**API** (`tests/api/users.spec.ts`)
- GET `/api/users?page=2` — checks status and response shape
- POST `/api/users` — creates a user, checks the response
- Bonus — updates the created user with a PUT request

## Structure

```
pages/          page object classes (Login, Products, Checkout)
tests/ui/       UI specs
tests/api/      API specs
playwright.config.ts
