# Stock Screener with Yahoo Finance

A full-stack Node.js + React stock screener application using **Yahoo Finance API**. Screen stocks by gap percentage, price range, P/E ratio, market cap, dividend yield, sector, exchange, and more.

## Features

- **Multi-criteria stock screening** - Filter by gap, price, P/E ratio, market cap, dividend yield, sector, exchange, active trading status
- **Real-time data** from Yahoo Finance (free, no API key required)
- **Web-based frontend** with React, TypeScript, and Vite
- **REST API backend** with Express.js
- **15 pre-configured screeners** (Daily Gainers, Tech Stocks, Dividend Stocks, etc.)
- **Comprehensive test suite** - 125 tests (114 mocked, 11 integration)
- **29.37% code coverage** with focus on core screening logic (60.24% on yahoo-client.ts)
- Dark theme UI with responsive design

## 📚 Documentation

For detailed guides, see the [docs folder](./docs/):

- **[Quick Start](./docs/QUICKSTART.md)** - Get up and running in minutes
- **[Testing Guide](./docs/TESTING.md)** - 125 tests, coverage metrics, CI/CD setup
- **[Test Coverage Report](./docs/TEST_COVERAGE.md)** - Detailed coverage analysis
- **[Debugging Guide](./docs/DEBUG_GUIDE.md)** - VS Code debugging setup
- **[Full Project Status](./docs/PROJECT_COMPLETE.md)** - Complete feature list

## Setup

1. **Install Dependencies**:
```bash
npm install
cd web && npm install && cd ..
```

2. **Start the Application**:
```bash
# Terminal 1: Start the API server (port 3001)
npm run server

# Terminal 2: Start the React frontend (port 3000)
cd web && npm run dev
```

3. **Open in browser**: `http://localhost:3000`

**Note:** No API key required! Uses free Yahoo Finance data.

## Usage

### Web Frontend

```bash
# Terminal 1: Start the API server
npm run server          # Server on port 3001

# Terminal 2: Start the React frontend
cd web && npm run dev   # Frontend on port 3000
```

Open `http://localhost:3000` in your browser.

**Features:**
- 15 pre-configured screening profiles (tabs at the top)
- Custom filter panel for advanced searches
- Real-time results table with sortable columns
- Gap percentage, price, P/E, market cap, dividend yield filters
- Sector and exchange filtering
- Responsive dark theme UI

### API Usage

```bash
# Screen with predefined screener (ID 1-15)
curl -X POST http://localhost:3001/api/screen/predefined \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "limit": 50}'

# Screen with custom filters
curl -X POST http://localhost:3001/api/screen \
  -H "Content-Type: application/json" \
  -d '{
    "minGap": 10,
    "minPrice": 5,
    "maxPrice": 500,
    "sector": "Technology",
    "limit": 50
  }'
```

### Programmatic Usage

```typescript
import { Screener } from './api/src/yahoo-client';

const screener = new Screener();

// Screen with predefined screener
const dailyGainers = await screener.screenPredefined(1, 50);

// Screen with custom filters
const results = await screener.screen({
  minGap: 10,              // Min daily gap %
  maxGap: 50,              // Max daily gap %
  minPrice: 5,             // Min price
  maxPrice: 500,           // Max price
  minPE: 10,               // Min P/E ratio
  maxPE: 30,               // Max P/E ratio
  minMarketCap: 1e9,       // Min market cap
  maxMarketCap: 100e9,     // Max market cap
  minDividendYield: 2,     // Min dividend yield %
  sector: 'Technology',    // By sector
  exchange: 'NASDAQ',      // By exchange
  isActivelyTrading: true, // Only active trading
  limit: 100
});
```

## API Reference

### REST Endpoints

- `POST /api/screen/predefined` - Screen with predefined screener (ID 1-15)
- `POST /api/screen` - Screen with custom filters
- `POST /api/watchlist/screen` - Screen watchlist

### Screener Class Methods

```typescript
// Predefined screeners (ID 1-15)
screenPredefined(id: number, limit?: number): Promise<Stock[]>

// Custom screening
screen(filters: FilterOptions): Promise<Stock[]>

// Filter options
interface FilterOptions {
  minGap?: number;           // Min daily gap %
  maxGap?: number;           // Max daily gap %
  minPrice?: number;         // Min stock price
  maxPrice?: number;         // Max stock price
  minPE?: number;            // Min P/E ratio
  maxPE?: number;            // Max P/E ratio
  minMarketCap?: number;     // Min market cap
  maxMarketCap?: number;     // Max market cap
  minDividendYield?: number; // Min dividend yield %
  sector?: string;           // Filter by sector
  exchange?: string;         // Filter by exchange (NASDAQ, NYSE, AMEX)
  isActivelyTrading?: boolean; // Only actively trading stocks
  limit?: number;            // Result limit (default 50)
}
```

## 15 Pre-configured Screeners

1. **Daily Gainers** - Top daily gainers
2. **Active Stocks** - Most actively traded
3. **Gainers** - Biggest gainers today
4. **Losers** - Biggest losers today
5. **Most Active** - Most active by volume
6. **Undervalued Growth** - Low P/E with growth
7. **Conservative Growth** - Stable growth stocks
8. **Dividend Aristocrats** - High dividend stocks
9. **Technology Stocks** - Tech sector
10. **Healthcare Stocks** - Healthcare sector
11. **Financial Stocks** - Finance sector
12. **Energy Stocks** - Energy sector
13. **Small Cap** - Market cap < $2B
14. **Mid Cap** - Market cap $2B-$10B
15. **Large Cap** - Market cap > $10B

## Project Structure

```
stocks/
├── README.md                      # This file
├── docs/                          # Documentation
│   ├── TESTING.md                 # Test reference (125 tests)
│   ├── TEST_COVERAGE.md           # Coverage metrics
│   ├── QUICKSTART.md              # Getting started
│   ├── DEBUG_GUIDE.md             # Debugging setup
│   └── PROJECT_COMPLETE.md        # Feature list
├── api/src/
│   └── yahoo-client.ts            # Yahoo Finance integration (341 lines, 60% coverage)
├── web/                           # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileSelector.tsx   # Screener tabs UI
│   │   │   ├── ResultsTable.tsx      # Results display
│   │   │   └── TickerManager.tsx     # Watchlist
│   │   ├── api/screener.ts
│   │   └── main.tsx
│   └── package.json
├── tests/                         # Test suite (125 tests)
│   ├── yahoo-client.mocked.test.ts  # 59 unit tests
│   ├── api.mocked.test.ts           # 28 API tests
│   ├── integration.test.ts          # 11 integration tests
│   └── extended-coverage.test.ts    # 27 extended tests
├── server.ts                      # Express API (214 lines)
├── vitest.config.ts               # Test configuration
├── package.json                   # Dependencies
└── tsconfig.json
```

## Testing

**125 tests across 4 suites** - all passing ✅

```bash
# Run all tests (16 seconds)
npm test

# Run with coverage report
npm run test:coverage

# Run specific suite
npm test -- tests/yahoo-client.mocked.test.ts
npm test -- tests/api.mocked.test.ts
npm test -- tests/integration.test.ts
```

**Coverage Metrics:**
| Metric | Value | Target |
|--------|-------|--------|
| Statements | 29.37% | 90% |
| Core (yahoo-client.ts) | 60.24% | 90% |
| Branches | 38.29% | 80% |
| Functions | 32.25% | 90% |
| Lines | 28.9% | 90% |

**Test Breakdown:**
- **59 unit tests** - Yahoo Client (mocked) - <1s
- **28 API tests** - Endpoints (mocked) - <1s
- **27 extended tests** - Complex scenarios (mocked) - <1s
- **11 integration tests** - Real Yahoo Finance data - ~15s

See [Testing Guide](./docs/TESTING.md) for detailed information.

## License

MIT
