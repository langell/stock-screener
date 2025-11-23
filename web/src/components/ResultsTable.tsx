import React, { useState } from 'react'
import { Stock } from '../api/screener'
import styles from './ResultsTable.module.css'

type SortField = 'symbol' | 'companyName' | 'price' | 'gap' | 'preMarketGap' | 'pe' | 'dividendYield' | 'marketCap'
type SortDirection = 'asc' | 'desc'

interface ResultsTableProps {
  stocks: Stock[]
  loading?: boolean
  error?: string
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ stocks, loading, error }) => {
  const [sortField, setSortField] = useState<SortField>('symbol')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (loading) {
    return <div className="loading">Loading stocks...</div>
  }

  if (stocks.length === 0) {
    return <div className="loading">No stocks found matching criteria</div>
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    let aVal: any = a[sortField]
    let bVal: any = b[sortField]

    if (aVal === undefined || aVal === null) aVal = -Infinity
    if (bVal === undefined || bVal === null) bVal = -Infinity

    if (typeof aVal === 'string') {
      const comparison = aVal.localeCompare(bVal)
      return sortDirection === 'asc' ? comparison : -comparison
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) {
      return <span className={styles.sortIcon}>⇅</span>
    }
    return <span className={styles.sortIcon}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
  }

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'N/A'
    return `$${price.toFixed(2)}`
  }

  const formatMarketCap = (cap: number | undefined) => {
    if (!cap) return 'N/A'
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(1)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`
    return `$${cap.toFixed(0)}`
  }

  const formatPercent = (value: number | undefined) => {
    if (value === undefined) return 'N/A'
    const color = value >= 0 ? 'gap-positive' : 'gap-negative'
    return <span className={color}>{value.toFixed(2)}%</span>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Results ({stocks.length} stocks)</h2>
      </div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('symbol')}>
                  Symbol <SortIcon field="symbol" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('companyName')}>
                  Company <SortIcon field="companyName" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('price')}>
                  Price <SortIcon field="price" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('gap')}>
                  Gap % <SortIcon field="gap" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('preMarketGap')}>
                  PreMarket Gap % <SortIcon field="preMarketGap" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('pe')}>
                  P/E <SortIcon field="pe" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('dividendYield')}>
                  Div Yield <SortIcon field="dividendYield" />
                </button>
              </th>
              <th>
                <button className={styles.headerBtn} onClick={() => handleSort('marketCap')}>
                  Market Cap <SortIcon field="marketCap" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className={styles.symbol}>{stock.symbol}</td>
                <td className={styles.company}>{stock.companyName}</td>
                <td>{formatPrice(stock.preMarketPrice || stock.price)}</td>
                <td>{formatPercent(stock.gap)}</td>
                <td>{formatPercent(stock.preMarketGap)}</td>
                <td>{stock.pe ? stock.pe.toFixed(1) : 'N/A'}</td>
                <td>{stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : 'N/A'}</td>
                <td>{formatMarketCap(stock.marketCap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
