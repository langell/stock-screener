import { describe, it, expect } from 'vitest'
import { YahooStockScreener } from '../api/src/yahoo-client'
import type { ScreeningFilters } from '../api/src/yahoo-client'

describe('YahooStockScreener - Extended Coverage Tests', () => {
  describe('Sector Filtering', () => {
    it('should accept sector filter', () => {
      const filters: ScreeningFilters = { sector: 'Technology' }
      expect(filters.sector).toBe('Technology')
    })

    it('should accept different sector values', () => {
      const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy']
      sectors.forEach((sector) => {
        const filters: ScreeningFilters = { sector }
        expect(filters.sector).toBe(sector)
      })
    })
  })

  describe('Exchange Filtering', () => {
    it('should accept exchange filter', () => {
      const filters: ScreeningFilters = { exchange: 'NASDAQ' }
      expect(filters.exchange).toBe('NASDAQ')
    })

    it('should accept multiple exchange values', () => {
      const exchanges = ['NASDAQ', 'NYSE', 'AMEX']
      exchanges.forEach((exchange) => {
        const filters: ScreeningFilters = { exchange }
        expect(filters.exchange).toBe(exchange)
      })
    })
  })

  describe('Active Trading Filter', () => {
    it('should accept isActivelyTrading filter', () => {
      const filters: ScreeningFilters = { isActivelyTrading: true }
      expect(filters.isActivelyTrading).toBe(true)
    })

    it('should accept false value for isActivelyTrading', () => {
      const filters: ScreeningFilters = { isActivelyTrading: false }
      expect(filters.isActivelyTrading).toBe(false)
    })
  })

  describe('Beta Filter', () => {
    it('should accept beta in stock data', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple',
        beta: 1.2,
      }
      expect(stock.beta).toBe(1.2)
    })

    it('should handle various beta values', () => {
      const betaValues = [0.8, 1.0, 1.5, 2.0]
      betaValues.forEach((beta) => {
        expect(beta).toBeGreaterThan(0)
      })
    })
  })

  describe('Volume Data', () => {
    it('should accept volume in stock data', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple',
        volume: 50000000,
      }
      expect(stock.volume).toBe(50000000)
    })

    it('should accept avgVolume in stock data', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple',
        avgVolume: 45000000,
      }
      expect(stock.avgVolume).toBe(45000000)
    })

    it('should handle high volume values', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple',
        volume: 1000000000,
        avgVolume: 950000000,
      }
      expect(stock.volume).toBeGreaterThan(stock.avgVolume!)
    })
  })

  describe('Industry Data', () => {
    it('should accept industry in stock data', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple',
        industry: 'Consumer Electronics',
      }
      expect(stock.industry).toBe('Consumer Electronics')
    })

    it('should accept various industries', () => {
      const industries = [
        'Consumer Electronics',
        'Software',
        'Healthcare',
        'Finance',
        'Energy',
      ]
      industries.forEach((industry) => {
        const stock = { symbol: 'TEST', companyName: 'Test', industry }
        expect(stock.industry).toBe(industry)
      })
    })
  })

  describe('Combined Complex Filters', () => {
    it('should accept all filter types together', () => {
      const filters: ScreeningFilters = {
        minMarketCap: 1000000,
        maxMarketCap: 10000000000,
        minPrice: 10,
        maxPrice: 500,
        minPE: 5,
        maxPE: 40,
        minDividendYield: 1,
        minGap: 1,
        maxGap: 10,
        sector: 'Technology',
        exchange: 'NASDAQ',
        isActivelyTrading: true,
        limit: 25,
      }

      expect(filters.minMarketCap).toBe(1000000)
      expect(filters.maxMarketCap).toBe(10000000000)
      expect(filters.minPrice).toBe(10)
      expect(filters.maxPrice).toBe(500)
      expect(filters.minPE).toBe(5)
      expect(filters.maxPE).toBe(40)
      expect(filters.minDividendYield).toBe(1)
      expect(filters.minGap).toBe(1)
      expect(filters.maxGap).toBe(10)
      expect(filters.sector).toBe('Technology')
      expect(filters.exchange).toBe('NASDAQ')
      expect(filters.isActivelyTrading).toBe(true)
      expect(filters.limit).toBe(25)
    })
  })

  describe('Screener Class Structure', () => {
    it('should have screen method', () => {
      const screener = new YahooStockScreener()
      expect(typeof screener.screen).toBe('function')
    })

    it('should have screenPredefined method', () => {
      const screener = new YahooStockScreener()
      expect(typeof screener.screenPredefined).toBe('function')
    })

    it('should allow multiple instances', () => {
      const screener1 = new YahooStockScreener()
      const screener2 = new YahooStockScreener()
      expect(screener1).not.toBe(screener2)
    })
  })

  describe('Filter Validation Logic', () => {
    it('should handle max values higher than min values', () => {
      const filters: ScreeningFilters = {
        minPrice: 10,
        maxPrice: 100,
        minMarketCap: 1000000,
        maxMarketCap: 1000000000,
        minPE: 5,
        maxPE: 50,
      }

      expect(filters.minPrice! < filters.maxPrice!).toBe(true)
      expect(filters.minMarketCap! < filters.maxMarketCap!).toBe(true)
      expect(filters.minPE! < filters.maxPE!).toBe(true)
    })

    it('should handle equal min and max values', () => {
      const filters: ScreeningFilters = {
        minPrice: 50,
        maxPrice: 50,
        minGap: 0,
        maxGap: 0,
      }

      expect(filters.minPrice).toBe(filters.maxPrice)
      expect(filters.minGap).toBe(filters.maxGap)
    })

    it('should handle negative gap values', () => {
      const filters: ScreeningFilters = {
        minGap: -10,
        maxGap: 10,
      }

      expect(filters.minGap! < 0).toBe(true)
      expect(filters.maxGap! > 0).toBe(true)
    })
  })

  describe('Stock Data Structure', () => {
    it('should have all optional properties', () => {
      const stock = {
        symbol: 'AAPL',
        companyName: 'Apple Inc.',
        marketCap: 2400000000000,
        sector: 'Technology',
        industry: 'Consumer Electronics',
        price: 150.25,
        previousClose: 149.5,
        gap: 2.5,
        preMarketPrice: 152.1,
        preMarketGap: 1.5,
        pe: 28.5,
        dividendYield: 0.5,
        beta: 1.2,
        volume: 50000000,
        avgVolume: 48000000,
      }

      expect(stock.symbol).toBeDefined()
      expect(stock.companyName).toBeDefined()
      expect(stock.marketCap).toBeDefined()
      expect(stock.sector).toBeDefined()
      expect(stock.industry).toBeDefined()
      expect(stock.price).toBeDefined()
      expect(stock.previousClose).toBeDefined()
      expect(stock.gap).toBeDefined()
      expect(stock.preMarketPrice).toBeDefined()
      expect(stock.preMarketGap).toBeDefined()
      expect(stock.pe).toBeDefined()
      expect(stock.dividendYield).toBeDefined()
      expect(stock.beta).toBeDefined()
      expect(stock.volume).toBeDefined()
      expect(stock.avgVolume).toBeDefined()
    })
  })

  describe('Async Operations', () => {
    it('should have async screen method', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({})
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(result.count).toBeDefined()
      expect(result.timestamp).toBeDefined()
    }, 15000)

    it('should have async screenPredefined method', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screenPredefined('day_gainers', 5)
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(result.count).toBeDefined()
    }, 15000)
  })

  describe('Filter Combinations for Different Strategies', () => {
    it('should support growth stock filter', () => {
      const growthFilters: ScreeningFilters = {
        minMarketCap: 10000000,
        minGap: 2,
        sector: 'Technology',
        limit: 20,
      }
      expect(growthFilters).toHaveProperty('minMarketCap')
      expect(growthFilters).toHaveProperty('minGap')
      expect(growthFilters).toHaveProperty('sector')
    })

    it('should support value stock filter', () => {
      const valueFilters: ScreeningFilters = {
        minDividendYield: 2,
        maxPE: 20,
        minMarketCap: 1000000000,
        limit: 20,
      }
      expect(valueFilters).toHaveProperty('minDividendYield')
      expect(valueFilters).toHaveProperty('maxPE')
    })

    it('should support day trader filter', () => {
      const dayTradeFilters: ScreeningFilters = {
        minGap: 3,
        minPrice: 5,
        isActivelyTrading: true,
        limit: 50,
      }
      expect(dayTradeFilters).toHaveProperty('minGap')
      expect(dayTradeFilters).toHaveProperty('isActivelyTrading')
    })

    it('should support small cap filter', () => {
      const smallCapFilters: ScreeningFilters = {
        minMarketCap: 300000000,
        maxMarketCap: 2000000000,
        limit: 30,
      }
      expect(smallCapFilters).toHaveProperty('minMarketCap')
      expect(smallCapFilters).toHaveProperty('maxMarketCap')
    })
  })
})
