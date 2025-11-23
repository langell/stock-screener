# Documentation Index

Welcome to the Stock Screener documentation. This folder contains all project documentation.

## Quick Reference

- **Getting Started**: See [QUICKSTART.md](./QUICKSTART.md)
- **API Integration**: [ALPHA_VANTAGE_SETUP.md](./ALPHA_VANTAGE_SETUP.md)
- **Testing Guide**: [TESTING.md](./TESTING.md)
- **Debugging**: [DEBUG_GUIDE.md](./DEBUG_GUIDE.md)

## Documentation Files

### Core Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Get up and running quickly |
| [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md) | Complete project overview and status |

### API & Integration

| Document | Purpose |
|----------|---------|
| [ALPHA_VANTAGE_SETUP.md](./ALPHA_VANTAGE_SETUP.md) | Alpha Vantage API setup and configuration |
| [ALPHA_VANTAGE_MIGRATION.md](./ALPHA_VANTAGE_MIGRATION.md) | Detailed migration guide from FMP to Alpha Vantage |

### Development & Testing

| Document | Purpose |
|----------|---------|
| [TESTING.md](./TESTING.md) | How to run tests |
| [TEST_COVERAGE.md](./TEST_COVERAGE.md) | Test coverage report and strategy |
| [UNIT_TESTING_COMPLETE.md](./UNIT_TESTING_COMPLETE.md) | Unit testing implementation details |
| [DEBUG_GUIDE.md](./DEBUG_GUIDE.md) | Debugging in VS Code with full stack setup |

### Tools & Utilities

| Document | Purpose |
|----------|---------|
| [SHELLS_GUIDE.md](./SHELLS_GUIDE.md) | Shell script utilities and commands |

## Project Structure

```
/stocks
├── README.md                 # Main project readme (in root)
├── docs/                     # This folder - all documentation
│   ├── INDEX.md             # This file
│   ├── QUICKSTART.md
│   ├── PROJECT_COMPLETE.md
│   ├── ALPHA_VANTAGE_SETUP.md
│   ├── ALPHA_VANTAGE_MIGRATION.md
│   ├── TESTING.md
│   ├── TEST_COVERAGE.md
│   ├── UNIT_TESTING_COMPLETE.md
│   ├── DEBUG_GUIDE.md
│   └── SHELLS_GUIDE.md
├── src/                      # Backend source code
├── web/                      # Frontend source code
├── tests/                    # Test files
├── server.ts                 # Express server
├── package.json
└── tsconfig.json
```

## Quick Links

- **Homepage**: Start here → [QUICKSTART.md](./QUICKSTART.md)
- **Troubleshooting**: See [DEBUG_GUIDE.md](./DEBUG_GUIDE.md)
- **API Issues**: Check [ALPHA_VANTAGE_SETUP.md](./ALPHA_VANTAGE_SETUP.md)
- **Test Results**: View [TEST_COVERAGE.md](./TEST_COVERAGE.md)

## Common Tasks

### Running the Application
```bash
npm start          # Server on port 3001
cd web && npm run dev  # Frontend on port 3000
```

### Running Tests
```bash
npm run test:all   # Run all tests
npm run test:fmp   # FMP client tests
```

### Debugging
See [DEBUG_GUIDE.md](./DEBUG_GUIDE.md) for comprehensive debugging instructions.

### Deploying
Refer to [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md) for deployment considerations.

---

**Last Updated**: November 21, 2025
