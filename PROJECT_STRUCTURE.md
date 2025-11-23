# Project Structure

## Directory Organization

```
stocks/
├── README.md                          # Main project readme
├── .env                               # Environment variables (not in git)
├── .gitignore
├── package.json                       # Root dependencies
├── tsconfig.json                      # TypeScript configuration
├── server.ts                          # Express API server
│
├── docs/                              # 📚 Documentation
│   ├── INDEX.md                       # Documentation index (START HERE)
│   ├── QUICKSTART.md                  # Get started in 5 minutes
│   ├── PROJECT_COMPLETE.md            # Full feature list & status
│   ├── ALPHA_VANTAGE_SETUP.md         # API setup & usage
│   ├── ALPHA_VANTAGE_MIGRATION.md     # Migration from FMP guide
│   ├── TESTING.md                     # How to run tests
│   ├── TEST_COVERAGE.md               # Test coverage report
│   ├── UNIT_TESTING_COMPLETE.md       # Unit testing details
│   ├── DEBUG_GUIDE.md                 # VS Code debugging
│   └── SHELLS_GUIDE.md                # Shell utilities
│
├── src/                               # 🔧 Backend TypeScript
│   ├── fmp-client.ts                  # Alpha Vantage API wrapper
│   │   ├── Stock interface
│   │   ├── ScreeningFilters interface
│   │   ├── FMPScreener class
│   │   └── Methods: screen(), screenByGap(), getStockQuote(), etc.
│   ├── analyzer.ts                    # Stock analysis & scoring
│   │   ├── ScreeningAnalyzer class
│   │   ├── Methods: scoreStocks(), findOutliers(), getStatistics()
│   │   └── Scoring logic & gap detection
│   ├── index.ts                       # CLI entry point
│   ├── cli.ts                         # CLI utilities
│   ├── examples-gap.ts                # Gap screening examples
│   └── examples-advanced.ts           # Advanced analysis examples
│
├── web/                               # ⚛️  React Frontend (TypeScript + Vite)
│   ├── src/
│   │   ├── App.tsx                    # Main component
│   │   │   ├── Three-column layout
│   │   │   ├── State management
│   │   │   └── API integration
│   │   ├── App.module.css             # Layout styles
│   │   ├── components/
│   │   │   ├── CustomFilters.tsx      # Filter panel (left)
│   │   │   ├── ResultsTable.tsx       # Results (center) - with sorting
│   │   │   ├── ProfileSelector.tsx    # Quick profiles (right)
│   │   │   └── *.module.css           # Component styles
│   │   ├── api/
│   │   │   └── screener.ts            # API client using import.meta.env
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts                 # Vite config with proxy to :3001
│   ├── tsconfig.json
│   ├── package.json
│   └── public/
│
├── tests/                             # 🧪 Test Suite (>90% coverage)
│   ├── fmp-client.test.ts             # API wrapper tests (10 tests)
│   ├── analyzer.test.ts               # Analysis logic tests (10 tests)
│   ├── components.test.ts             # Component logic tests (10 tests)
│   ├── server.test.ts                 # API endpoint tests (10 tests)
│   └── screener.test.ts               # Integration tests
│
├── dist/                              # 📦 Build output (compiled JS)
│
├── .vscode/
│   └── launch.json                    # VS Code debug configs
│       ├── Debug Server configuration
│       ├── Attach to React configuration
│       ├── Debug Full Stack (compound)
│       └── Keyboard shortcuts documentation
│
└── node_modules/                      # Dependencies (not in git)
```

## Key Files Explained

### Backend (src/)

| File | Purpose | Lines |
|------|---------|-------|
| `fmp-client.ts` | Alpha Vantage API wrapper with screening logic | ~500 |
| `analyzer.ts` | Stock analysis, scoring, statistics | ~300 |
| `index.ts` | CLI entry point with examples | ~100 |
| `server.ts` | Express API server with endpoints | ~160 |

### Frontend (web/src/)

| File | Purpose |
|------|---------|
| `App.tsx` | Main component with three-column layout |
| `App.module.css` | Layout grid, responsive design |
| `components/CustomFilters.tsx` | Left sidebar - filter controls |
| `components/ResultsTable.tsx` | Center - sortable results table |
| `components/ProfileSelector.tsx` | Right sidebar - quick profiles |
| `api/screener.ts` | HTTP client for backend API |

### Tests (tests/)

| File | Tests | Coverage |
|------|-------|----------|
| `fmp-client.test.ts` | API wrapper, gap calculation, filtering | 100% |
| `analyzer.test.ts` | Scoring, statistics, outlier detection | 100% |
| `components.test.ts` | Sorting logic, filtering logic | 100% |
| `server.test.ts` | API endpoints, response handling | ~80% |

## Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (API keys, ports) |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Dependencies & npm scripts |
| `vite.config.ts` | Vite bundler config with proxy |
| `.vscode/launch.json` | VS Code debugging configurations |

## Module Dependencies

### Backend Dependencies
- **express** - Web server framework
- **cors** - Cross-origin requests
- **axios** - HTTP client for APIs
- **dotenv** - Environment variables
- **typescript** - Type safety

### Frontend Dependencies
- **react** 18.2.0 - UI framework
- **vite** 5.0.0 - Build tool
- **typescript** - Type safety
- **axios** - HTTP client
- **recharts** - Data visualization

### Dev Dependencies
- **tsx** - TypeScript execution
- **vite** - Development server
- **typescript** - Compilation

## API Endpoints

All endpoints start with `http://localhost:3001/api`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/screen` | Universal screener with filters |
| POST | `/screen/market-cap` | Screen by market cap |
| POST | `/screen/pe` | Screen by P/E ratio |
| POST | `/screen/gap` | Screen by gap percentage |
| POST | `/screen/gap/large` | Screen for large gaps (>20%) |
| GET | `/quote/:symbol` | Get stock quote |

## Environment Variables

```bash
# Required
ALPHA_ADVANTAGE_API_KEY=your_key_here

# Frontend
VITE_API_URL=http://localhost:3001

# Optional
API_TIMEOUT=10000
PORT=3001
```

## Build Outputs

- **`dist/`** - Compiled backend JavaScript from TypeScript
- **`web/dist/`** - Built frontend (React bundle)

## Common Commands

```bash
npm run build              # Compile TypeScript
npm start                  # Run server
npm run dev                # Dev server + frontend
npm run test:all          # Run all tests
npm run test:fmp          # Run API tests
npx tsx server.ts         # Run server without build step
cd web && npm run dev     # Frontend dev server only
```

## Data Flow

```
User Input (Web UI)
    ↓
React Components (App.tsx)
    ↓
HTTP Request → Backend API (server.ts)
    ↓
FMPScreener (fmp-client.ts) → Alpha Vantage API
    ↓
Analyzer (analyzer.ts) - Score & filter stocks
    ↓
Response → Frontend (ResultsTable.tsx)
    ↓
Display & Sort Results (React UI)
```

## Deployment Considerations

For production:
- Set `API_BASE_URL` to production Alpha Vantage endpoint
- Update `VITE_API_URL` to production backend URL
- Enable authentication for API endpoints
- Consider caching overview data
- Upgrade to premium Alpha Vantage tier
- Use environment variables for all sensitive config

---

**See [docs/INDEX.md](./docs/INDEX.md) for full documentation**
