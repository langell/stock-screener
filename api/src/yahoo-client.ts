import YahooFinance from 'yahoo-finance2';

export interface Stock {
  symbol: string;
  companyName: string;
  marketCap?: number;
  sector?: string;
  industry?: string;
  price?: number;
  previousClose?: number;
  gap?: number;
  preMarketPrice?: number;
  preMarketGap?: number;
  pe?: number;
  dividendYield?: number;
  beta?: number;
  volume?: number;
  avgVolume?: number;
}

export interface ScreeningFilters {
  limit?: number;
  minMarketCap?: number;
  maxMarketCap?: number;
  minPrice?: number;
  maxPrice?: number;
  minPE?: number;
  maxPE?: number;
  minDividendYield?: number;
  minGap?: number;
  maxGap?: number;
  sector?: string;
  exchange?: string;
  isActivelyTrading?: boolean;
}

export interface ScreeningResult {
  data: Stock[];
  count: number;
  timestamp: Date;
}

export class YahooStockScreener {
  private symbols: string[] = [
    // Mega Cap Tech
    'AAPL', 'MSFT', 'GOOG', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA',
    // Large Cap Tech
    'AMD', 'ADBE', 'CRM', 'AVGO', 'QCOM', 'CSCO', 'INTC', 'NFLX', 'ASML', 'MU',
    // Large Cap Finance
    'JPM', 'BAC', 'WFC', 'GS', 'MS', 'BLK', 'SCHW',
    // Large Cap Healthcare
    'JNJ', 'UNH', 'PFE', 'ABBV', 'MRK', 'LLY', 'TMO', 'AZN',
    // Large Cap Industrials
    'BA', 'CAT', 'GE', 'HON', 'MMM', 'ITW', 'LMT', 'RTX',
    // Large Cap Energy
    'XOM', 'CVX', 'COP', 'SLB', 'MPC', 'PSX', 'EOG',
    // Large Cap Consumer
    'WMT', 'TGT', 'COST', 'MCD', 'NKE', 'SBUX', 'CMG', 'DIS',
    // Large Cap Communication
    'VZ', 'T', 'CMCSA', 'CHTR', 'TMUS',
    // Large Cap Utilities
    'NEE', 'DUK', 'SO', 'EXC', 'AEP',
    // Large Cap Real Estate
    'PLD', 'EQIX', 'DLR', 'PSA', 'WELL',
    // Mid Cap Growth
    'SNOW', 'DDOG', 'NOW', 'CRWD', 'SPLK', 'OKTA', 'TWLO', 'ZM',
    // Biotech & Pharma
    'GILD', 'BIIB', 'ALNY', 'SGEN', 'BKNG', 'REGN',
    // Semiconductors
    'MCHP', 'NXPI', 'LRCX', 'KLAC', 'AMAT', 'ASML',
    // Retail & Consumer
    'AMZN', 'BABA', 'SE', 'DKNG', 'DASH', 'UBER',
    // Fintech & Payments
    'SQ', 'PYPL', 'COIN', 'HOOD', 'AXP',
    // Small/Mid Cap High Growth
    'UPST', 'RBLX', 'ROKU', 'PINS', 'TTD', 'ZS', 'PSTG',
    // ETFs & Index Funds
    'SPY', 'QQQ', 'IWM', 'XLK', 'XLF', 'XLE', 'XLV', 'XLY',
  ];
  private yahooFinance: InstanceType<typeof YahooFinance>;

  constructor() {
    this.yahooFinance = new YahooFinance();
  }

  /**
   * Fetch real stock data from Yahoo Finance
   */
  async getStockData(symbol: string): Promise<Stock | null> {
    try {
      console.log(`📊 Fetching data for ${symbol}...`);
      const result: any = await this.yahooFinance.quote(symbol);

      if (!result || !result.regularMarketPrice) {
        console.warn(`⚠️  No price data for ${symbol}`);
        return null;
      }

      const price = result.regularMarketPrice;
      const previousClose = result.regularMarketPreviousClose || price;
      const gap = this.calculateGap(price, previousClose);

      // Pre-market data
      const preMarketPrice = result.preMarketPrice || price;
      const preMarketGap = this.calculateGap(preMarketPrice, previousClose);

      const stock: Stock = {
        symbol: result.symbol || symbol,
        companyName: result.longName || symbol,
        price,
        previousClose,
        gap,
        preMarketPrice,
        preMarketGap,
        marketCap: result.marketCap,
        sector: result.sector,
        industry: result.industry,
        pe: result.trailingPE,
        dividendYield: result.dividendYield ? result.dividendYield * 100 : 0,
        beta: result.beta,
        volume: result.volume,
        avgVolume: result.averageVolume,
      };

      console.log(`✅ ${symbol}: PreMarket $${preMarketPrice.toFixed(2)} (Gap: ${preMarketGap.toFixed(2)}%)`);
      return stock;
    } catch (error) {
      console.error(`❌ Error fetching data for ${symbol}:`, error instanceof Error ? error.message : error);
      return null;
    }
  }

  /**
   * Screen stocks using Yahoo Finance data
   */
  async screen(filters: ScreeningFilters): Promise<ScreeningResult> {
    try {
      console.log(`🔄 Starting screen for ${this.symbols.length} symbols...`);
      const stocks = await Promise.all(
        this.symbols.map((symbol) => this.getStockData(symbol))
      );

      const validStocks = stocks.filter((s): s is Stock => s !== null);
      console.log(`✨ Got ${validStocks.length} valid stocks from Yahoo Finance`);
      
      const filtered = this.filterStocks(validStocks, filters);
      console.log(`📋 After filtering: ${filtered.length} stocks match criteria`);

      return {
        data: filtered,
        count: filtered.length,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('❌ Screen error:', error);
      throw error;
    }
  }

  /**
   * Screen by market cap range
   */
  async screenByMarketCap(min: number, max: number, limit: number = 50): Promise<ScreeningResult> {
    const filters: ScreeningFilters = {
      minMarketCap: min,
      maxMarketCap: max,
      limit,
    };
    return this.screen(filters);
  }

  /**
   * Screen by P/E ratio range
   */
  async screenByPERatio(min: number, max: number, limit: number = 50): Promise<ScreeningResult> {
    const filters: ScreeningFilters = {
      minPE: min,
      maxPE: max,
      limit,
    };
    return this.screen(filters);
  }

  /**
   * Screen by dividend yield range
   */
  async screenByDividendYield(min: number, max?: number, limit: number = 50): Promise<ScreeningResult> {
    const filters: ScreeningFilters = {
      minDividendYield: min,
      limit,
    };
    if (max) {
      filters.limit = limit;
    }
    return this.screen(filters);
  }

  /**
   * Screen by gap percentage
   */
  async screenByGap(min: number, max?: number, limit: number = 50): Promise<ScreeningResult> {
    const filters: ScreeningFilters = {
      minGap: min,
      limit,
    };
    if (max) {
      filters.maxGap = max;
    }
    return this.screen(filters);
  }

  /**
   * Screen by large gap
   */
  async screenByLargeGap(percentage: number, limit: number = 50): Promise<ScreeningResult> {
    const filters: ScreeningFilters = {
      minGap: percentage,
      limit,
    };
    return this.screen(filters);
  }

  /**
   * Get stock quote by symbol
   */
  async getStockQuoteWithGap(symbol: string): Promise<Stock | null> {
    return this.getStockData(symbol);
  }

  /**
   * Calculate gap percentage
   */
  private calculateGap(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }

  /**
   * Filter stocks by criteria (client-side filtering)
   */
  private filterStocks(stocks: Stock[], filters: ScreeningFilters): Stock[] {
    return stocks.filter((stock) => {
      // Market cap filters
      if (filters.minMarketCap && (!stock.marketCap || stock.marketCap < filters.minMarketCap)) {
        return false;
      }
      if (filters.maxMarketCap && (!stock.marketCap || stock.marketCap > filters.maxMarketCap)) {
        return false;
      }

      // Price filters
      if (filters.minPrice && (!stock.price || stock.price < filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && (!stock.price || stock.price > filters.maxPrice)) {
        return false;
      }

      // P/E ratio filters
      if (filters.minPE && (!stock.pe || stock.pe < filters.minPE)) {
        return false;
      }
      if (filters.maxPE && (!stock.pe || stock.pe > filters.maxPE)) {
        return false;
      }

      // Dividend yield filters
      if (filters.minDividendYield && (!stock.dividendYield || stock.dividendYield < filters.minDividendYield)) {
        return false;
      }

      // Gap filters (use pre-market gap, check absolute value for gap magnitude)
      if (filters.minGap !== undefined && stock.preMarketGap !== undefined) {
        const absGap = Math.abs(stock.preMarketGap);
        if (absGap < filters.minGap) {
          return false;
        }
      }
      if (filters.maxGap !== undefined && stock.preMarketGap !== undefined) {
        const absGap = Math.abs(stock.preMarketGap);
        if (absGap > filters.maxGap) {
          return false;
        }
      }

      // Sector filter
      if (filters.sector && stock.sector !== filters.sector) {
        return false;
      }

      return true;
    }).slice(0, filters.limit || 50);
  }

  /**
   * Screen using predefined Yahoo Finance screener modules
   */
  async screenPredefined(scrId: string, limit: number = 50): Promise<ScreeningResult> {
    try {
      console.log(`🎯 Running predefined screener: ${scrId}`);
      const result: any = await this.yahooFinance.screener({
        scrIds: scrId as any,
        count: limit,
      });

      if (!result || !result.quotes) {
        console.warn(`⚠️  No results for screener: ${scrId}`);
        return { data: [], count: 0, timestamp: new Date() };
      }

      const stocks: Stock[] = result.quotes.map((quote: any) => ({
        symbol: quote.symbol,
        companyName: quote.longName || quote.shortName || quote.symbol,
        price: quote.regularMarketPrice,
        previousClose: quote.regularMarketPreviousClose,
        gap: quote.regularMarketChangePercent,
        preMarketPrice: quote.preMarketPrice || quote.regularMarketPrice,
        preMarketGap: quote.preMarketChangePercent || quote.regularMarketChangePercent,
        marketCap: quote.marketCap,
        sector: quote.sector,
        industry: quote.industry,
        pe: quote.trailingPE,
        dividendYield: quote.trailingAnnualDividendYield ? quote.trailingAnnualDividendYield * 100 : 0,
        beta: quote.beta,
        volume: quote.regularMarketVolume,
        avgVolume: quote.averageDailyVolume3Month,
      }));

      console.log(`✅ Got ${stocks.length} stocks from ${scrId}`);
      return {
        data: stocks,
        count: stocks.length,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`❌ Error running screener ${scrId}:`, error instanceof Error ? error.message : error);
      return { data: [], count: 0, timestamp: new Date() };
    }
  }
}
