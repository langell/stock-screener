# Stock Screener - Full Stack Web Application

## 🎉 Project Complete!

You now have a complete full-stack stock screener application with:

### ✅ What's Included

#### 1. **React Web Frontend** (`/web`)
- Modern, responsive design
- Dark theme with blue accents
- Built with Vite for fast development
- TypeScript for type safety
- Interactive components:
  - Quick screening profiles (7 pre-configured screens)
  - Advanced custom filters
  - Real-time results table
  - Loading states and error handling

#### 2. **Express.js Backend API** (`/server.ts`)
- RESTful API endpoints
- CORS enabled
- Stock screening endpoints
- Profile management
- Health checks
- Error handling

#### 3. **CLI Tools** (Original)
- `./screener.sh` - Direct CLI screening
- Pre-configured profiles
- Shell script interface

#### 4. **Test Suite**
- Comprehensive unit tests
- API client tests
- Analyzer tests

---

## 🚀 Getting Started

### Quick Start (5 minutes)

```bash
# 1. Install all dependencies
npm install
cd web && npm install && cd ..

# 2. Add your FMP API key
echo "FMP_API_KEY=your_key_here" > .env

# 3. Start backend (Terminal 1)
npm run server

# 4. Start frontend (Terminal 2)
cd web && npm run dev

# 5. Open browser
# http://localhost:3000
```

### More Details

See `QUICKSTART.md` for detailed instructions and troubleshooting.

---

## 📁 Project Structure

```
stocks/
├── src/                    # CLI & backend source
│   ├── fmp-client.ts      # FMP API wrapper
│   ├── analyzer.ts        # Stock analysis utilities
│   ├── cli.ts             # CLI interface
│   └── examples-*.ts      # Example scripts
├── web/                   # React frontend
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── App.tsx       # Main app
│   │   └── index.css     # Global styles
│   ├── vite.config.ts
│   └── package.json
├── tests/                 # Test suite
├── server.ts              # Express.js API server
├── screener.sh           # CLI shell script
├── package.json          # Root dependencies
├── README.md             # Main documentation
├── QUICKSTART.md         # Quick start guide
└── SHELLS_GUIDE.md       # CLI documentation
```

---

## 💻 Using the Web Application

### 1. Quick Screens
Click any of these buttons for instant screening:
- **Tech Growth** - Tech sector with P/E < 40
- **Large Gap** - Daily gap > 20%
- **Huge Gap** - Daily gap > 50%
- **Dividends** - High dividend yield
- **Large Cap/Small Cap** - By market cap
- **Value Stocks** - Low P/E ratio

### 2. Custom Filters
Use the advanced filter panel to search by:
- Market cap range
- Price range
- P/E ratio range
- Dividend yield
- Gap percentage
- Sector
- Result limit

### 3. Results Table
View detailed stock information:
- Symbol and company name
- Current price
- Daily gap % (color-coded green/red)
- P/E ratio
- Dividend yield
- Market cap

---

## 🔌 API Endpoints

When running `npm run server`, access these endpoints:

```
POST /api/screen                 # Universal screening with filters
POST /api/screen/market-cap      # Market cap range screening
POST /api/screen/pe              # P/E ratio range screening
POST /api/screen/dividend        # Dividend yield screening
POST /api/screen/gap             # Gap percentage screening
POST /api/screen/gap/large       # Large gap screening
GET  /api/quote/:symbol          # Get individual stock quote
GET  /api/profiles               # List screening profiles
GET  /api/health                 # Health check
```

---

## 🎯 Available Screening Profiles

| Profile | Criteria | Use Case |
|---------|----------|----------|
| tech_growth | Tech sector, P/E < 40 | Growth investing |
| large_gap | Daily gap > 20% | Gap trading |
| huge_gap | Daily gap > 50% | Large gap plays |
| dividend_aristocrats | Dividend yield > 3% | Income investing |
| dividend_stocks | Dividend yield > 2% | Dividend screening |
| large_cap | Market cap > $10B | Blue chip stocks |
| small_cap | Market cap $300M-$2B | Small cap growth |
| value_stocks | P/E < 15 | Value investing |

---

## 🔧 Development

### Running Different Modes

```bash
# Web frontend only
cd web && npm run dev

# Backend API only
npm run server

# CLI screener (no server)
./screener.sh large_gap

# Run tests
./screener.sh test

# Advanced analysis example
./screener.sh advanced
```

### Build for Production

```bash
# Build backend
npm run build

# Build frontend
cd web && npm run build

# Output in web/dist/
```

---

## 📊 Key Features

### ✨ Frontend Features
- 🎨 Modern dark UI theme
- 📱 Responsive design (desktop/mobile)
- ⚡ Fast with Vite
- 🔄 Real-time results
- 📈 Color-coded gap indicators
- 🎯 Pre-configured quick screens
- 🔧 Advanced custom filters

### 🔗 Backend Features
- 🚀 Express.js REST API
- 🔐 CORS enabled
- 📊 Gap calculation
- 🏦 FMP API integration
- 📉 Demo data fallback
- ❌ Comprehensive error handling

### 📋 CLI Features
- 🖥️ Command-line interface
- 💾 Multiple screening profiles
- 📊 Stock data display
- 🧪 Full test suite
- 🔄 Batch processing

---

## 🐛 Troubleshooting

### Common Issues

**"Connection refused" error**
- Backend not running: `npm run server`
- Check port 5000 is available

**"No stocks found"**
- API key invalid or expired
- Try less restrictive filters
- Check console for API errors

**Port already in use**
- Change port in `web/vite.config.ts` (frontend)
- Or change PORT in `server.ts` (backend)

**TypeScript errors**
```bash
npm install  # Re-install dependencies
npx tsc --noEmit  # Check for errors
```

See `QUICKSTART.md` for more troubleshooting.

---

## 📈 Next Steps

### Enhance the Application

1. **Add Charts**
   - Use Recharts (already installed)
   - Gap distribution charts
   - Price history charts

2. **Add More Profiles**
   - Edit `ProfileSelector.tsx`
   - Add custom screening logic

3. **Add More Filters**
   - Update `ScreeningFilters` interface
   - Add filter inputs
   - Handle in API endpoints

4. **Persist Filters**
   - Store in localStorage
   - Save watchlists
   - Export results to CSV

5. **Deploy**
   - Vercel, Netlify, or AWS
   - Containerize with Docker
   - Use CI/CD pipelines

---

## 📚 Documentation

- **QUICKSTART.md** - Get running in 5 minutes
- **README.md** - Full project documentation
- **web/README.md** - Frontend documentation
- **SHELLS_GUIDE.md** - CLI usage guide

---

## 🎓 Learning Resources

### Technologies Used
- **Frontend**: React 18, TypeScript, Vite, CSS Modules
- **Backend**: Express.js, Node.js, TypeScript
- **API**: Financial Modeling Prep (FMP)
- **Tools**: Axios, ESM, Recharts

### Code Examples

**Using the API client:**
```typescript
import { screenerApi } from './api/screener'

// Screen by large gap
const result = await screenerApi.screenByLargeGap(20)

// Custom filters
const result = await screenerApi.screen({
  sector: 'Technology',
  minPE: 0,
  maxPE: 40,
  limit: 50
})
```

**Using the CLI:**
```bash
./screener.sh large_gap
./screener.sh tech_growth
./screener.sh dividend_aristocrats
```

---

## 🤝 Contributing

This is your personal project! Feel free to:
- Add new features
- Improve the UI
- Optimize the backend
- Add more data sources
- Share with others

---

## 📞 Support

If you encounter issues:
1. Check `QUICKSTART.md` troubleshooting section
2. Review browser console for errors
3. Check backend server logs
4. Verify FMP API key is valid

---

## 🎉 You're All Set!

Your stock screener is ready to use! Start with:

```bash
npm run server  # Backend
# ... in another terminal ...
cd web && npm run dev  # Frontend
```

Then open http://localhost:3000 and start screening!

Happy investing! 📈
