import express from 'express';
import cors from 'cors';
import { YahooStockScreener, ScreeningFilters } from './api/src/yahoo-client.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize screener with Yahoo Finance
const screener = new YahooStockScreener();

// Routes

/**
 * POST /api/screen/predefined
 * Screen using predefined Yahoo Finance screener modules
 */
app.post('/api/screen/predefined', async (req, res) => {
  try {
    const { scrId, limit } = req.body;
    
    if (!scrId) {
      res.status(400).json({ error: 'No screener ID provided' });
      return;
    }

    const result = await screener.screenPredefined(scrId, limit || 50);
    res.json(result);
  } catch (error) {
    console.error('❌ Predefined screener error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to run predefined screener' });
  }
});

/**
 * POST /api/screen
 * Universal stock screener with multiple filters
 */
app.post('/api/screen', async (req, res) => {
  try {
    console.log('📡 Screen request received:', req.body);
    const filters: ScreeningFilters = req.body;
    console.log('🔍 Applying filters:', filters);
    const result = await screener.screen(filters);
    console.log(`✅ Found ${result.count} stocks`);
    res.json(result);
  } catch (error) {
    console.error('❌ Screen error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/screen/market-cap
 * Screen by market cap range
 */
app.post('/api/screen/market-cap', async (req, res) => {
  try {
    const { min, max, limit } = req.body;
    const result = await screener.screenByMarketCap(min, max, limit || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/screen/pe
 * Screen by P/E ratio range
 */
app.post('/api/screen/pe', async (req, res) => {
  try {
    const { min, max, limit } = req.body;
    const result = await screener.screenByPERatio(min, max, limit || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/screen/dividend
 * Screen by dividend yield
 */
app.post('/api/screen/dividend', async (req, res) => {
  try {
    const { min, max, limit } = req.body;
    const result = await screener.screenByDividendYield(min, max || 100, limit || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/screen/gap
 * Screen by gap percentage range
 */
app.post('/api/screen/gap', async (req, res) => {
  try {
    const { min, max, limit } = req.body;
    const result = await screener.screenByGap(min, max || 100, limit || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/screen/gap/large
 * Screen by large gap
 */
app.post('/api/screen/gap/large', async (req, res) => {
  try {
    const { percentage, limit } = req.body;
    const result = await screener.screenByLargeGap(percentage, limit || 50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen stocks' });
  }
});

/**
 * POST /api/watchlist/screen
 * Screen stocks from watchlist
 */
app.post('/api/watchlist/screen', async (req, res) => {
  try {
    const { symbols } = req.body;
    
    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      res.status(400).json({ error: 'No symbols provided' });
      return;
    }

    console.log(`📋 Fetching data for watchlist: ${symbols.join(', ')}`);
    
    const data = await Promise.all(
      symbols.map((symbol: string) => screener.getStockQuoteWithGap(symbol))
    );

    const validStocks = data.filter((s) => s !== null);
    console.log(`✅ Got ${validStocks.length}/${symbols.length} watchlist stocks`);

    res.json({
      data: validStocks,
      count: validStocks.length,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('❌ Watchlist screen error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to screen watchlist' });
  }
});

/**
 * GET /api/quote/:symbol
 * Get stock quote by symbol
 */
app.get('/api/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const quote = await screener.getStockQuoteWithGap(symbol);
    if (!quote) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to get quote' });
  }
});

/**
 * GET /api/profiles
 * Get available screening profiles
 */
app.get('/api/profiles', (req, res) => {
  const profiles: Record<string, ScreeningFilters> = {
    tech_growth: { sector: 'Technology', minPE: 0, maxPE: 40, minMarketCap: 1e9, limit: 50 },
    large_gap: { minGap: 20, limit: 50 },
    huge_gap: { minGap: 50, limit: 30 },
    dividend_aristocrats: { minDividendYield: 3, limit: 50 },
    dividend_stocks: { minDividendYield: 2, limit: 50 },
    large_cap: { minMarketCap: 10e9, limit: 50 },
    small_cap: { minMarketCap: 300e6, maxMarketCap: 2e9, limit: 50 },
    value_stocks: { minPE: 0, maxPE: 15, minMarketCap: 1e9, limit: 50 },
  };
  res.json(profiles);
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Stock Screener API running on http://localhost:${PORT}`);
  console.log(`📊 Frontend should connect to http://localhost:${PORT}/api`);
});
