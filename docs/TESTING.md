# Test Suite Reference

## Quick Start

### Running Tests

```bash
# Run all tests (125 tests)
npm test

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/yahoo-client.mocked.test.ts
npm test -- tests/api.mocked.test.ts
npm test -- tests/integration.test.ts
npm test -- tests/extended-coverage.test.ts
```

## What's Tested

### ✅ Yahoo Client (`api/src/yahoo-client.ts`) - 59 Tests
**File:** `tests/yahoo-client.mocked.test.ts`
- Stock screener with Yahoo Finance integration
- Filter objects: gap, price, P/E, market cap, dividend yield, sector, exchange, active trading
- Response structure validation
- All 15 predefined screeners (Watchlist, Daily, Growth, Value, Funds)
- Stock data structure with all optional properties
- Error handling and edge cases
- Async operations with real API calls

### ✅ API Endpoints - 28 Tests
**File:** `tests/api.mocked.test.ts`
- POST `/api/screen/predefined` - Predefined screener endpoint
- POST `/api/screen` - Custom filter screening endpoint
- POST `/api/watchlist/screen` - Watchlist screening endpoint
- Request/response validation
- Status codes (200, 400, 500)
- Error handling for invalid filters
- Response data structure validation

### ✅ Real API Integration - 11 Tests
**File:** `tests/integration.test.ts`
- Live Yahoo Finance data retrieval
- screenPredefined() with all 15 screeners
- screen() with various filter combinations
- Real stock data validation
- API response correctness with actual market data
- Timeout handling for slow API responses

### ✅ Extended Feature Coverage - 27 Tests
**File:** `tests/extended-coverage.test.ts`
- Sector filtering (Technology, Healthcare, Finance, Energy, etc.)
- Exchange filtering (NASDAQ, NYSE, AMEX)
- Active trading status filters
- Beta values (0.8, 1.0, 1.5, 2.0)
- Volume data (single/average volume combinations)
- Industry data filtering
- Complex multi-filter combinations
- Trading strategy filters (growth, value, day trade, small cap)
- Filter validation logic (max > min, equal values, negative gaps)
- Screener class structure validation

## Test Coverage Summary

| Category | Tests | Type | Duration | Status |
|----------|-------|------|----------|--------|
| Yahoo Client Unit | 59 | Mocked | <1s | ✅ Passing |
| API Endpoints | 28 | Mocked | <1s | ✅ Passing |
| Integration | 11 | Real API | ~15s | ✅ Passing |
| Extended Coverage | 27 | Mocked | <1s | ✅ Passing |
| **TOTAL** | **125** | **Mixed** | **~16s** | **✅ All Passing** |

### Code Coverage Metrics

| Metric | Value | Target |
|--------|-------|--------|
| Statements | 29.37% | 90% |
| Branches | 38.29% | 80% |
| Functions | 32.25% | 90% |
| Lines | 28.9% | 90% |
| Core Component (yahoo-client.ts) | 60.24% | 90% |

**Note:** Mocked tests (114) run fast for CI/CD. Integration tests (11) validate real functionality. Server.ts (0%) tested through API mocks to avoid external dependencies in test suite.

## Test Files Location

```
/tests/
├── yahoo-client.mocked.test.ts    # 59 Yahoo Finance client unit tests (mocked)
├── api.mocked.test.ts             # 28 API endpoint tests (mocked)
├── integration.test.ts            # 11 Real API integration tests
└── extended-coverage.test.ts      # 27 Extended feature coverage tests (mocked)

Configuration:
├── vitest.config.ts               # Vitest setup (Node environment, v8 coverage)
├── package.json                   # Test scripts: test, test:coverage
└── .gitignore                     # Excludes coverage/ directory
```

## Running Specific Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/yahoo-client.mocked.test.ts
npm test -- tests/api.mocked.test.ts
npm test -- tests/integration.test.ts
npm test -- tests/extended-coverage.test.ts

# Run tests matching pattern
npm test -- --grep "filter"
npm test -- --grep "predefined"

# Watch mode (auto-rerun on changes)
npm test -- --watch
```

### Expected Output

```
✓ tests/yahoo-client.mocked.test.ts (59)
✓ tests/api.mocked.test.ts (28)
✓ tests/integration.test.ts (11)
✓ tests/extended-coverage.test.ts (27)

Test Files  4 passed (4)
Tests  125 passed (125)
Duration  15.38s (transform 195ms, setup 0ms, collect 427ms, tests 18.60s)
```

### Coverage Report Output

```
✓ tests/yahoo-client.mocked.test.ts (59)
✓ tests/api.mocked.test.ts (28)
✓ tests/integration.test.ts (11)
✓ tests/extended-coverage.test.ts (27)

Test Files  4 passed (4)
Tests  125 passed (125)
Duration  16.15s

────────────────────────────────────────────────────────────────────────────────
File                      | % Stmts | % Branch | % Funcs | % Lines |
────────────────────────────────────────────────────────────────────────────────
All files                 |   29.37 |    38.29 |   32.25 |    28.9 |
api/src/yahoo-client.ts   |   60.24 |    62.5  |   56.25 |   60.46 |
server.ts                 |       0 |        0 |       0 |       0 |
────────────────────────────────────────────────────────────────────────────────
```

## Test Execution Performance

- **Total Runtime:** ~16 seconds (all 125 tests)
- **Mocked Tests:** 114 tests in <1 second
- **Integration Tests:** 11 real API calls in ~15 seconds
- **Exit Code:** 0 (success) or 1 (failure)
- **Output:** ANSI color-coded for readability
- **Framework:** Vitest v4.0.13 with v8 coverage provider

## Continuous Integration

Tests are optimized for CI/CD pipelines:

```bash
# In CI pipeline (quick validation)
npm test || exit 1

# With coverage verification
npm run test:coverage || exit 1
```

### CI/CD Best Practices

1. **Fast Feedback:** Run mocked tests first (~1s) for quick PR validation
2. **Real Validation:** Run integration tests separately for nightly builds (~15s)
3. **Coverage Tracking:** Use `npm run test:coverage` to monitor trends
4. **Parallel Execution:** Test files run in parallel within Vitest
5. **No External Deps:** Mocked tests don't require Yahoo Finance API availability

### Recommended CI Job Configuration

```yaml
# Quick PR check (2 minutes)
job:test:
  script:
    - npm test
  timeout: 120s

# Nightly full validation (5 minutes)  
job:test:full:
  script:
    - npm run test:coverage
  timeout: 300s
  only: [main]
```

## Adding New Tests

To add tests for new features, use Vitest format:

```typescript
// tests/my-feature.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { MyFeature } from '../api/src/my-feature';

describe('My Feature', () => {
  let feature: MyFeature;
  
  beforeEach(() => {
    feature = new MyFeature();
  });
  
  it('should do something', () => {
    const result = feature.doSomething();
    expect(result).toBe(expectedValue);
  });
  
  it('should handle edge case', () => {
    expect(() => {
      feature.invalidInput();
    }).toThrow();
  });
});
```

### Test Categories

- **Mocked Tests**: Use for testing business logic without external dependencies
  - Location: `tests/*mocked*.test.ts`
  - Speed: <1s
  - Use Case: Unit tests, filter validation, data transformation

- **Integration Tests**: Use for testing real API interactions
  - Location: `tests/integration.test.ts`
  - Speed: ~15s (real API calls)
  - Use Case: End-to-end flows, actual Yahoo Finance data

- **Extended Coverage**: Use for testing complex scenarios and filter combinations
  - Location: `tests/extended-coverage.test.ts`
  - Speed: <1s (mocked)
  - Use Case: Trading strategies, multi-filter combinations, edge cases

### Running Tests After Adding

```bash
# New test is automatically picked up by Vitest
npm test

# View coverage including new tests
npm run test:coverage

# Run only your new tests
npm test -- my-feature.test.ts
```

## Test Architecture Overview

```
Test Suite Architecture (125 tests)
│
├─ Mocked Tests (114 tests) ─ <1s each
│  ├─ yahoo-client.mocked.test.ts (59 tests)
│  │  └─ Filter combinations, response structure, all screeners
│  ├─ api.mocked.test.ts (28 tests)
│  │  └─ API endpoints, status codes, error handling
│  └─ extended-coverage.test.ts (27 tests)
│     └─ Sector/exchange/strategy filters, complex combinations
│
└─ Integration Tests (11 tests) ─ ~15s total
   └─ integration.test.ts
      └─ Real Yahoo Finance API calls, live market data validation

Coverage: 29.37% overall, 60.24% core component (yahoo-client.ts)
Target: 90% by improving server.ts and adding edge case tests
```

## Troubleshooting

### Tests Failing

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Run specific test for debugging
npm test -- tests/yahoo-client.mocked.test.ts -t "filter"

# Check Node environment
node --version  # Should be 20.12.1 or higher
```

### Coverage Not Improving

1. Check which files lack coverage: `npm run test:coverage`
2. Add tests for untested branches in those files
3. For server.ts: Add direct endpoint tests or use supertest library
4. Run `npm test -- --coverage` to see detailed line-by-line coverage

### Integration Tests Timeout

- Yahoo Finance API can be slow. Default timeout: 30s per test
- To increase timeout: Modify vitest.config.ts `testTimeout` value
- To skip integration tests: `npm test -- --exclude integration.test.ts`

---

**Coverage Target:** 90% (Currently 29.37% overall, 60.24% core)
**Test Suite:** 125 tests across 4 files
**Execution Time:** ~16 seconds (optimized for CI/CD)
**Framework:** Vitest v4.0.13 with v8 coverage
**Last Updated:** December 2024


