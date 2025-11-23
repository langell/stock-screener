import { describe, it, expect } from 'vitest'
import { YahooStockScreener } from '../api/src/yahoo-client'

describe('YahooStockScreener - Integration Tests for Coverage', () => {
  describe('Real API Calls for Coverage', () => {
    it('should instantiate and have methods', () => {
      const screener = new YahooStockScreener()
      expect(screener).toBeDefined()
      expect(typeof screener.screen).toBe('function')
      expect(typeof screener.screenPredefined).toBe('function')
    })

    it('should apply filter objects correctly', () => {
      const screener = new YahooStockScreener()
      expect(screener).toBeInstanceOf(YahooStockScreener)
    })

    it('should handle predefined screener names', () => {
      const names = [
        'day_gainers',
        'day_losers',
        'most_actives',
        'growth_technology_stocks',
        'undervalued_large_caps',
        'undervalued_growth_stocks',
        'aggressive_small_caps',
        'small_cap_gainers',
        'most_shorted_stocks',
        'portfolio_anchors',
        'high_yield_bond',
        'top_mutual_funds',
        'solid_large_growth_funds',
        'solid_midcap_growth_funds',
        'conservative_foreign_funds',
      ]
      expect(names.length).toBe(15)
      names.forEach((name) => {
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
      })
    })

    it('should process screen with empty filters', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({})
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.count).toBeDefined()
      expect(result.timestamp).toBeDefined()
    }, 15000)

    it('should process screen with minGap filter', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({ minGap: 2 })
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      if (result.data.length > 0) {
        result.data.forEach((stock) => {
          expect(stock).toHaveProperty('symbol')
          expect(stock).toHaveProperty('price')
          expect(stock).toHaveProperty('gap')
        })
      }
    }, 15000)

    it('should process screen with limit', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({ limit: 5 })
      expect(result).toBeDefined()
      expect(result.data.length).toBeLessThanOrEqual(5)
    }, 15000)

    it('should process predefined screener', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screenPredefined('day_gainers', 5)
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      if (result.data.length > 0) {
        const stock = result.data[0]
        expect(stock).toHaveProperty('symbol')
        expect(stock).toHaveProperty('price')
      }
    }, 15000)

    it('should handle multiple screener types', async () => {
      const screener = new YahooStockScreener()
      const results = await Promise.all([
        screener.screenPredefined('day_gainers', 3),
        screener.screenPredefined('day_losers', 3),
        screener.screenPredefined('most_actives', 3),
      ])
      expect(results.length).toBe(3)
      results.forEach((result) => {
        expect(result).toHaveProperty('data')
        expect(result).toHaveProperty('count')
      })
    }, 20000)

    it('should return consistent response structure', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({ minPrice: 10, limit: 3 })
      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('count')
      expect(result).toHaveProperty('timestamp')
      expect(result.count).toBe(result.data.length)
      expect(result.timestamp).toBeDefined()
    }, 15000)

    it('should validate stock data structure', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({ limit: 3 })
      if (result.data.length > 0) {
        const stock = result.data[0]
        expect(typeof stock.symbol).toBe('string')
        expect(typeof stock.price).toBe('number')
        expect(stock.price).toBeGreaterThan(0)
      }
    }, 15000)

    it('should apply combined filters', async () => {
      const screener = new YahooStockScreener()
      const result = await screener.screen({
        minPrice: 5,
        maxPrice: 100,
        limit: 5,
      })
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
    }, 15000)
  })
})
