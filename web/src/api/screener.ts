import axios from 'axios'

const API_BASE = 'http://localhost:3001/api'

export interface Stock {
  symbol: string
  companyName: string
  marketCap?: number
  sector?: string
  industry?: string
  price?: number
  previousClose?: number
  gap?: number
  pe?: number
  dividendYield?: number
  beta?: number
  volume?: number
  avgVolume?: number
}

export interface ScreeningResult {
  data: Stock[]
  count: number
  timestamp: string
}

export interface ScreeningFilters {
  limit?: number
  minMarketCap?: number
  maxMarketCap?: number
  minPrice?: number
  maxPrice?: number
  minPE?: number
  maxPE?: number
  minDividendYield?: number
  minGap?: number
  maxGap?: number
  sector?: string
  exchange?: string
  isActivelyTrading?: boolean
}

const client = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
})

export const screenerApi = {
  screen: (filters: ScreeningFilters) =>
    client.post<ScreeningResult>('/screen', filters),

  screenPredefined: (scrId: string, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/predefined', { scrId, limit }),

  screenByMarketCap: (min: number, max: number, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/market-cap', { min, max, limit }),

  screenByPERatio: (min: number, max: number, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/pe', { min, max, limit }),

  screenByDividendYield: (min: number, max: number = 100, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/dividend', { min, max, limit }),

  screenByGap: (min: number, max: number = 100, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/gap', { min, max, limit }),

  screenByLargeGap: (percentage: number, limit: number = 50) =>
    client.post<ScreeningResult>('/screen/gap/large', { percentage, limit }),

  screenWatchlist: (symbols: string[]) =>
    client.post<ScreeningResult>('/watchlist/screen', { symbols }),

  getProfiles: () =>
    client.get<Record<string, ScreeningFilters>>('/profiles'),

  getStockQuote: (symbol: string) =>
    client.get<Stock>(`/quote/${symbol}`),
}
