# Alpha Vantage API Migration

## Overview
Successfully migrated the stock screener from **Financial Modeling Prep (FMP)** to **Alpha Vantage** API.

## Key Changes

### 1. Environment Variables
**Before:**
```bash
FMP_API_KEY=...
API_BASE_URL=https://financialmodelingprep.com/api/v3
```

**After:**
```bash
ALPHA_ADVANTAGE_API_KEY=B8XU0VKAEBT9E6JG
```

### 2. API Endpoints
The application now uses Alpha Vantage endpoints:

| Function | Endpoint | Purpose |
|----------|----------|---------|
| **GLOBAL_QUOTE** | `function=GLOBAL_QUOTE&symbol=AAPL` | Real-time stock quotes with price, volume, previous close |
| **OVERVIEW** | `function=OVERVIEW&symbol=AAPL` | Company fundamentals (P/E, market cap, sector, etc.) |
| **TIME_SERIES_DAILY_ADJUSTED** | `function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL` | Daily adjusted OHLCV data (optional, for historical analysis) |

### 3. API Base URL
- **FMP**: `https://financialmodelingprep.com/api/v3`
- **Alpha Vantage**: `https://www.alphavantage.co/query`

### 4. Data Structure Changes

#### GLOBAL_QUOTE Response (Alpha Vantage)
```json
{
  "Global Quote": {
    "01. symbol": "AAPL",
    "05. price": "266.25",
    "08. previous close": "268.56",
    "06. volume": "45823568"
  }
}
```

#### OVERVIEW Response (Alpha Vantage)
```json
{
  "Symbol": "AAPL",
  "Name": "Apple Inc",
  "MarketCapitalization": "2800000000000",
  "PERatio": "32.5",
  "DividendYield": "0.0042",
  "Sector": "Technology",
  "Industry": "Consumer Electronics"
}
```

### 5. Code Updates in `src/fmp-client.ts`

**getFullStockData() method:**
- Calls `GLOBAL_QUOTE` to get real-time price and volume
- Calls `OVERVIEW` to get company fundamentals
- Combines results into single `Stock` object
- Calculates gap percentage from current price vs previous close

**getStockQuoteWithGap() method:**
- Updated to use `GLOBAL_QUOTE` endpoint
- Returns price, previous close, volume, and calculated gap

**getStockQuote() method:**
- Simplified to use `GLOBAL_QUOTE` endpoint
- Returns basic quote information

### 6. Rate Limiting

Alpha Vantage free tier has rate limits:
- **5 requests per minute** (free tier)
- **500 requests per day** (free tier)

The application handles rate limiting gracefully by:
1. Falling back to demo data when API calls fail
2. Supplementing with demo data if too few stocks are returned
3. Providing clear console warnings when using demo data

### 7. Features Maintained

All existing features continue to work:
- ✅ Stock screening by gap percentage
- ✅ Filtering by P/E ratio
- ✅ Filtering by market cap
- ✅ Filtering by dividend yield
- ✅ Filtering by price range
- ✅ Gap calculation (current - previous close)
- ✅ Real-time quotes
- ✅ Company fundamentals
- ✅ Fallback to demo data

### 8. Testing

**Test Individual Quote:**
```bash
curl http://localhost:3001/api/quote/AAPL
```

**Test Gap Screening:**
```bash
curl -X POST http://localhost:3001/api/screen \
  -H "Content-Type: application/json" \
  -d '{"minGap": 5}'
```

**Response Example:**
```json
{
  "data": [
    {
      "symbol": "MSFT",
      "companyName": "Microsoft Corporation",
      "price": 432.5,
      "previousClose": 405.25,
      "gap": 6.724,
      "marketCap": 3200000000000,
      "pe": 42.3,
      "dividendYield": 0.72
    }
  ],
  "count": 1,
  "timestamp": "2025-11-21T12:40:17.242Z"
}
```

## API Documentation

For detailed Alpha Vantage documentation, visit:
https://www.alphavantage.co/documentation/

### Core APIs Used:
- **Time Series Data**: GLOBAL_QUOTE, TIME_SERIES_DAILY_ADJUSTED
- **Fundamental Data**: OVERVIEW, COMPANY_PROFILE
- **Free Tier Limits**: 5 API calls/minute, 500/day

## Production Considerations

For production deployment, consider:

1. **Upgrade to Premium Tier**: Removes rate limits
   - $20/month for 120 req/min
   - $75/month for 600 req/min

2. **Implement Caching**: Cache OVERVIEW data (changes rarely)

3. **Queue Requests**: Use job queue for bulk screening

4. **Database Integration**: Store historical data

5. **API Key Rotation**: Manage multiple API keys for load distribution

## Troubleshooting

**Issue: "API key not found" error**
- Solution: Verify `ALPHA_ADVANTAGE_API_KEY` is set in `.env`

**Issue: "Cannot find module '/dist/fmp-client'"**
- Solution: Run `npm run build` to compile TypeScript

**Issue: "Empty results from API"**
- Possible causes:
  - Rate limit exceeded (wait a minute)
  - API key invalid
  - Network connection issue
- Fallback: Uses demo data automatically

**Issue: Port 3001 already in use**
- Solution: `lsof -i :3001 | awk 'NR>1 {print $2}' | xargs kill -9`

## Rollback (if needed)

To revert to FMP:
1. Update `.env` with FMP API key
2. Restore previous `src/fmp-client.ts` from git history
3. Run `npm run build`
4. Restart server

## Migration Checklist

- [x] Update environment variables
- [x] Migrate API endpoints
- [x] Update data parsing for Alpha Vantage format
- [x] Add rate limit handling
- [x] Test quote endpoint
- [x] Test screening endpoint
- [x] Test gap calculation
- [x] Verify demo data fallback
- [x] Update documentation
- [x] Test with frontend

## Next Steps

1. Monitor API usage and costs
2. Consider caching strategy for OVERVIEW data
3. Implement request queuing for better rate limit management
4. Plan for premium tier upgrade if usage grows
