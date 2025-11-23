# Stock Screener with Alpha Vantage

A Node.js + React stock screener application using the **Alpha Vantage API**. Screen stocks by various metrics like market cap, P/E ratio, dividends, daily gaps, and sector.

## Features

- Query stocks by multiple criteria (market cap, P/E, price range, sector, **daily gap**, etc.)
- Real-time data from Alpha Vantage API
- **Web-based frontend** with React, TypeScript, and Vite
- **REST API backend** with Express.js and TypeScript
- Easy-to-use CLI and programmatic API
- **Gap screening** - Find stocks with large daily price gaps (>20%, >50%, or negative)
- Full test coverage (>90%)
- VS Code debugging with full-stack configuration

## 📚 Documentation

For detailed guides, see the [docs folder](./docs/):

- **[Quick Start](./docs/QUICKSTART.md)** - Get up and running in minutes
- **[Alpha Vantage Setup](./docs/ALPHA_VANTAGE_SETUP.md)** - API configuration and usage
- **[Testing Guide](./docs/TESTING.md)** - How to run tests
- **[Debugging Guide](./docs/DEBUG_GUIDE.md)** - VS Code debugging setup
- **[Full Project Status](./docs/PROJECT_COMPLETE.md)** - Complete feature list
- **[Documentation Index](./docs/INDEX.md)** - All available documentation

## Setup

1. **Get API Key**: Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and get your free API key

2. **Install Dependencies**:
```bash
npm install
cd web && npm install && cd ..
```

3. **Configure Environment**:
Create `.env` file in the root directory:
```
ALPHA_ADVANTAGE_API_KEY=your_api_key_here
VITE_API_URL=http://localhost:3001
```

4. **Start the Application**:
```bash
npm start          # Start server on http://localhost:3001

# In another terminal:
cd web && npm run dev   # Start frontend on http://localhost:3000
```

## Usage

### Web Frontend

```bash
# Terminal 1: Start the API server
npm start          # Server on port 3001

# Terminal 2: Start the React frontend
cd web && npm run dev   # Frontend on port 3000
```

Then open your browser to `http://localhost:3000`

**Features:**
- Interactive stock screening with quick profile buttons
- Custom filter panel for advanced searches
- Real-time results table with sortable columns
- Gap percentage calculations
- Full responsive design

### CLI Usage

#### Using the shell script (recommended):

```bash
# Make it executable (first time only)
chmod +x screener.sh

# Show help
./screener.sh help

# Run a screening profile
./screener.sh screen tech_growth
./screener.sh screen large_gap
./screener.sh screen dividend_aristocrats

# Run examples
./screener.sh gap          # Gap screening examples
./screener.sh advanced     # Advanced analysis examples
./screener.sh test         # Run test suite
```

##### Optional: Add to PATH for global access

```bash
# Create symlink to /usr/local/bin (requires sudo)
sudo ln -s $(pwd)/screener-global.sh /usr/local/bin/screener

# Now you can run from anywhere:
screener help
screener screen tech_growth
screener screen large_gap
```

#### Using npm directly:

```bash
npm run screen -- market_cap_small
npm run screen -- dividend_aristocrats
npm run screen -- tech_growth

# Screen for stocks with large gaps
npm run screen -- large_gap      # Gap > 20%
npm run screen -- huge_gap       # Gap > 50%
npm run screen -- negative_gap   # Gap < -10%

# Run gap screening examples
npm run examples:gap
```

### Programmatic Usage

```typescript
import { FMPScreener } from './src/fmp-client';

const screener = new FMPScreener('your_api_key');

// Screen stocks by market cap
const smallCap = await screener.screenByMarketCap(1e6, 1e8);

// Screen growth stocks
const growth = await screener.screenByPERatio(0, 25);

// Screen by daily gap - find stocks that gapped up > 20%
const largeGaps = await screener.screenByLargeGap(20);

// Screen for negative gaps (gapped down > 10%)
const negativeGaps = await screener.screenByNegativeGap(-100, -10);

// Get a stock quote with gap calculation
const quote = await screener.getStockQuoteWithGap('AAPL');
console.log(`AAPL: ${quote.price}, Gap: ${quote.gap}%`);

// Custom filters
const results = await screener.screen({
  limit: 100,
  minMarketCap: 1e9,
  maxMarketCap: 50e9,
  minPrice: 10,
  maxPrice: 500,
  sector: 'Technology'
});
```

## API Reference

### FMPScreener Class

- `screen(filters)` - Screen stocks with custom filters
- `screenByMarketCap(min, max)` - Filter by market cap range
- `screenByPERatio(min, max)` - Filter by P/E ratio
- `screenByDividendYield(min, max)` - Filter by dividend yield
- `screenByPriceRange(min, max)` - Filter by price range
- `screenByGap(min, max)` - Filter by gap percentage range
- `screenByLargeGap(percentage)` - Find stocks with gap > percentage (e.g., >20%)
- `screenByNegativeGap(min, max)` - Find stocks that gapped down
- `screenBySector(sector)` - Filter by sector
- `getStockQuote(symbol)` - Get current quote for a symbol
- `getStockQuoteWithGap(symbol)` - Get quote with calculated gap percentage

## Built-in Screening Profiles

The CLI includes pre-configured screening profiles:

- **small_cap** - Stocks under $2B market cap
- **large_cap** - Stocks over $10B market cap
- **dividend_aristocrats** - High dividend yielding stocks
- **tech_growth** - Tech sector growth stocks
- **value_stocks** - Low P/E ratio stocks
- **large_gap** - Stocks with daily gap > 20%
- **huge_gap** - Stocks with daily gap > 50%
- **negative_gap** - Stocks that gapped down > 10%

## Rate Limits

**Alpha Vantage Free Tier:**
- 5 API calls/minute
- 500 calls/day

The app intelligently falls back to demo data when limits are reached. For production, upgrade to a paid plan ($20+/month) for higher limits.

## Project Structure

```
stocks/
├── README.md                 # This file
├── docs/                     # Documentation (see INDEX.md)
│   ├── QUICKSTART.md
│   ├── ALPHA_VANTAGE_SETUP.md
│   ├── TESTING.md
│   └── ...
├── src/                      # Backend source code
│   ├── fmp-client.ts         # Alpha Vantage API wrapper
│   ├── analyzer.ts           # Screening logic
│   └── ...
├── web/                      # React frontend (TypeScript)
│   ├── src/
│   ├── components/
│   └── package.json
├── tests/                    # Test suite
├── server.ts                 # Express API server
├── package.json
└── tsconfig.json
```

## Testing

```bash
npm run test:all             # Run all tests
npm run test:fmp             # FMP client tests
npm run test:analyzer        # Analyzer tests
npm run test:components      # Component tests
```

See [Testing Guide](./docs/TESTING.md) for details.

## License

MIT
