# Shell Scripts Guide

This project includes convenient shell scripts to run the stock screener.

## `screener.sh` - Main CLI Script

The primary script for running all screener commands from the project directory.

### Quick Start

```bash
# Make executable (first time only)
chmod +x screener.sh

# Show all available commands
./screener.sh help

# Run a screening profile
./screener.sh screen tech_growth
./screener.sh screen large_gap
./screener.sh screen dividend_aristocrats

# Run examples and tests
./screener.sh gap        # Gap screening examples
./screener.sh advanced   # Advanced analysis
./screener.sh test       # Run test suite
```

### Available Commands

| Command | Description |
|---------|-------------|
| `screen [profile]` | Run a screening profile (default: tech_growth) |
| `gap` | Show gap screening examples |
| `advanced` | Run advanced screening with analysis |
| `test` | Run the test suite |
| `help` | Display help message |

### Available Profiles

**Market Cap:**
- `small_cap` - Under $2B
- `mid_cap` - $2B-$10B
- `large_cap` - Over $10B
- `mega_cap` - Over $100B

**Strategies:**
- `dividend_aristocrats` - High dividend (>3%)
- `dividend_stocks` - Dividend paying (>2%)
- `tech_growth` - Tech sector, P/E < 40
- `value_stocks` - Low P/E < 15
- `penny_stocks` - Under $5

**Sectors:**
- `healthcare` - Healthcare sector
- `finance` - Finance sector

**Gap Screening:**
- `large_gap` - Gap > 20%
- `huge_gap` - Gap > 50%
- `negative_gap` - Gapped down > 10%

## `screener-global.sh` - Global Wrapper

Optional script for adding screener to your system PATH.

### Setup (Optional)

```bash
# Create a symlink to /usr/local/bin
sudo ln -s $(pwd)/screener-global.sh /usr/local/bin/screener

# Now run from anywhere:
screener help
screener screen large_gap
screener screen tech_growth
```

### Uninstall Global Command

```bash
sudo rm /usr/local/bin/screener
```

## Requirements

- Node.js 18+
- `.env` file with `FMP_API_KEY` configured
- npm dependencies installed (`npm install`)

## Examples

```bash
# Screen for tech stocks
./screener.sh screen tech_growth

# Find stocks that gapped up > 20%
./screener.sh screen large_gap

# Show high dividend stocks
./screener.sh screen dividend_aristocrats

# Run advanced analysis on tech stocks
./screener.sh advanced

# Run all tests
./screener.sh test

# Show this help
./screener.sh help
```

## Troubleshooting

**Error: `.env file not found`**
```bash
cp .env.example .env
# Edit .env and add your FMP_API_KEY from https://site.financialmodelingprep.com/
```

**Permission denied**
```bash
chmod +x screener.sh
chmod +x screener-global.sh
```

**npm dependencies missing**
```bash
npm install
```
