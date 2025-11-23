# Quick Start Guide

## 🚀 Start the Full Stack Application

### Prerequisites
- Node.js 18+
- npm
- FMP API key (from https://site.financialmodelingprep.com/)

### Step 1: Configure API Key

```bash
# In the root directory
echo "FMP_API_KEY=your_api_key_here" > .env
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd web && npm install && cd ..
```

### Step 3: Start Both Servers

**Option A: Two Terminal Windows (Recommended)**

Terminal 1 - Start the backend API:
```bash
npm run server
# Server will run on http://localhost:5000
```

Terminal 2 - Start the React frontend:
```bash
cd web
npm run dev
# Frontend will run on http://localhost:3000
```

Then open: http://localhost:3000

**Option B: Single Terminal with concurrently (if installed)**

```bash
npm run dev:full  # (if you set this up in package.json)
```

### Step 4: Use the Web Interface

1. Open http://localhost:3000
2. Click on a quick screen button (e.g., "Large Gap")
3. Or use custom filters and click "Search"
4. View results in the table

## 📊 Available Quick Screens

- **Tech Growth** - Technology sector with P/E < 40
- **Large Gap** - Stocks with daily gap > 20%
- **Huge Gap** - Stocks with daily gap > 50%
- **Dividends** - High dividend yield stocks (>3%)
- **Large Cap** - Market cap > $10B
- **Small Cap** - Market cap $300M-$2B
- **Value Stocks** - Low P/E < 15

## 🎨 Custom Filters Available

- Market Cap (min/max)
- Price (min/max)
- P/E Ratio (min/max)
- Dividend Yield (minimum)
- Gap % (minimum)
- Sector
- Result limit

## 🛠 Troubleshooting

### "Connection Refused" Error
- Make sure backend is running: `npm run server`
- Check port 5000 is available
- Verify no firewall issues

### No Results Showing
- Check API key is valid in `.env`
- Try a less restrictive filter
- Check browser console for errors

### Frontend won't start
```bash
cd web
npm install
npm run dev
```

### Port 3000 already in use
Edit `web/vite.config.ts`:
```typescript
server: {
  port: 3001  // Change to available port
}
```

## 📚 Other Available Commands

**CLI Screening (without frontend):**
```bash
./screener.sh large_gap
./screener.sh tech_growth
./screener.sh dividend_aristocrats
```

**Run Tests:**
```bash
./screener.sh test
```

**API Only Mode:**
```bash
npm run server  # Starts at http://localhost:5000/api
```

## 🔗 API Endpoints

When running the backend server, you can access:

```
POST   /api/screen                 - Universal screener
POST   /api/screen/market-cap      - Market cap filtering
POST   /api/screen/pe              - P/E ratio filtering
POST   /api/screen/dividend        - Dividend yield filtering
POST   /api/screen/gap             - Gap percentage filtering
POST   /api/screen/gap/large       - Large gap screening
GET    /api/quote/:symbol          - Get stock quote
GET    /api/profiles               - List all profiles
GET    /api/health                 - Health check
```

## 📱 Mobile Access

Frontend works on mobile devices! To access from another device on the same network:

1. Find your machine's local IP: `ipconfig getifaddr en0` (Mac) or `ifconfig` (Linux)
2. Access from mobile: `http://<your-ip>:3000`

Make sure firewall allows port 3000.

## 🎯 Next Steps

- Customize quick screen profiles in `web/src/components/ProfileSelector.tsx`
- Add new filters in the `CustomFilters` component
- Build custom charts with Recharts
- Deploy to production with Vercel or Netlify

Enjoy screening stocks! 📈
