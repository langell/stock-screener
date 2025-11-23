import React, { useState } from 'react'
import { DollarSign, TrendingUp, Percent, BarChart3, Building2, ChevronDown, ChevronRight, Search, LineChart } from 'lucide-react'
import { screenerApi, Stock, ScreeningFilters } from './api/screener'
import { ProfileSelector } from './components/ProfileSelector'
import { ResultsTable } from './components/ResultsTable'
import { TickerManager } from './components/TickerManager'
import styles from './App.module.css'

function App() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([])

  const handleSelectProfile = async (scrId: string) => {
    setLoading(true)
    setError(undefined)

    try {
      // Call predefined screener using Yahoo Finance screener module
      const response = await screenerApi.screenPredefined(scrId, 50)
      setStocks(response.data.data || [])

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stocks')
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCustomSearch = async (filters: ScreeningFilters) => {
    setLoading(true)
    setError(undefined)

    try {
      const response = await screenerApi.screen(filters)
      setStocks(response.data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stocks')
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const handleScreenWatchlist = async (symbols: string[]) => {
    if (symbols.length === 0) {
      setError('Watchlist is empty. Add some symbols first!')
      return
    }

    setLoading(true)
    setError(undefined)

    try {
      const response = await screenerApi.screenWatchlist(symbols)
      setStocks(response.data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to screen watchlist')
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const handleScreenWatchlistClick = () => {
    handleScreenWatchlist(watchlistSymbols)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1><LineChart size={28} /> Stock Screener</h1>
          <p>Search and filter stocks by multiple criteria</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <aside className={styles.leftSidebar}>
              <TickerManager onSymbolsChange={setWatchlistSymbols} />
              <CustomFilters onSearch={handleCustomSearch} loading={loading} />
            </aside>
            <div className={styles.content}>
              <ResultsTable stocks={stocks} loading={loading} error={error} />
            </div>
            <aside className={styles.rightSidebar}>
              <ProfileSelector onSelectProfile={handleSelectProfile} onScreenWatchlist={handleScreenWatchlistClick} loading={loading} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

interface CustomFiltersProps {
  onSearch: (filters: ScreeningFilters) => void
  loading: boolean
}

const CustomFilters: React.FC<CustomFiltersProps> = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState<ScreeningFilters>({})
  const [isExpanded, setIsExpanded] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const numValue = value === '' ? undefined : parseFloat(value)

    setFilters((prev) => ({
      ...prev,
      [name]: isNaN(numValue as number) ? value : numValue,
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  return (
    <div className={styles.customFilters}>
      <button
        className={styles.customFiltersHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.customFiltersTitle}><Search size={16} /> Custom Filters</span>
        <span className={styles.customFiltersArrow}>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>
      
      {isExpanded && (
        <>
          <div className={styles.filterGrid}>
            <div>
              <label>Min Market Cap ($)</label>
              <input
                type="number"
                name="minMarketCap"
                placeholder="e.g., 1000000000"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label>Max Market Cap ($)</label>
              <input
                type="number"
                name="maxMarketCap"
                placeholder="e.g., 10000000000"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label>Min Price ($)</label>
              <input type="number" name="minPrice" placeholder="e.g., 10" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Max Price ($)</label>
              <input type="number" name="maxPrice" placeholder="e.g., 500" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Min P/E Ratio</label>
              <input type="number" name="minPE" placeholder="e.g., 10" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Max P/E Ratio</label>
              <input type="number" name="maxPE" placeholder="e.g., 25" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Min Dividend Yield (%)</label>
              <input type="number" name="minDividendYield" placeholder="e.g., 2" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Min Gap (%)</label>
              <input type="number" name="minGap" placeholder="e.g., 10" onChange={handleChange} disabled={loading} />
            </div>
            <div>
              <label>Sector</label>
              <select name="sector" onChange={handleChange} disabled={loading}>
                <option value="">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Energy">Energy</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
            <div>
              <label>Limit Results</label>
              <input type="number" name="limit" placeholder="e.g., 50" onChange={handleChange} disabled={loading} />
            </div>
          </div>
          <button onClick={handleSearch} disabled={loading} className={styles.searchBtn}>
            <Search size={16} /> {loading ? 'Searching...' : 'Search'}
          </button>
        </>
      )}
    </div>
  )
}

export default App
