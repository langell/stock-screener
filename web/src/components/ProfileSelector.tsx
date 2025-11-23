import React, { useState } from 'react'
import { Bookmark, TrendingUp, TrendingDown, Zap, Target, DollarSign, Briefcase } from 'lucide-react'
import styles from './ProfileSelector.module.css'

interface Profile {
  scrId: string
  label: string
  description: string
}

type Category = 'watchlist' | 'daily' | 'growth' | 'value' | 'funds'

const SCREENERS: Record<Category, Profile[]> = {
  watchlist: [
    { scrId: 'watchlist', label: 'My Watchlist', description: 'Screen watchlist symbols' },
  ],
  daily: [
    { scrId: 'day_gainers', label: 'Day Gainers', description: 'Best performing today' },
    { scrId: 'day_losers', label: 'Day Losers', description: 'Worst performing today' },
    { scrId: 'most_actives', label: 'Most Active', description: 'Highest trading volume' },
  ],
  growth: [
    { scrId: 'growth_technology_stocks', label: 'Growth Tech', description: 'Growth technology stocks' },
    { scrId: 'aggressive_small_caps', label: 'Aggressive SmallCaps', description: 'High growth small caps' },
    { scrId: 'small_cap_gainers', label: 'Small Cap Gainers', description: 'Small cap winners' },
  ],
  value: [
    { scrId: 'undervalued_large_caps', label: 'Undervalued', description: 'Undervalued large caps' },
    { scrId: 'undervalued_growth_stocks', label: 'Undervalued Growth', description: 'Undervalued growth stocks' },
    { scrId: 'most_shorted_stocks', label: 'Most Shorted', description: 'Most shorted stocks' },
    { scrId: 'portfolio_anchors', label: 'Portfolio Anchors', description: 'Stable large-cap stocks' },
  ],
  funds: [
    { scrId: 'high_yield_bond', label: 'High Yield Bonds', description: 'High-yield bond funds' },
    { scrId: 'top_mutual_funds', label: 'Top Mutual Funds', description: 'Top performing mutual funds' },
    { scrId: 'solid_large_growth_funds', label: 'Large Growth Funds', description: 'Large cap growth funds' },
    { scrId: 'solid_midcap_growth_funds', label: 'Midcap Growth Funds', description: 'Midcap growth funds' },
    { scrId: 'conservative_foreign_funds', label: 'Conservative Intl', description: 'Conservative international funds' },
  ],
}

const CATEGORY_INFO: Record<Category, { icon: React.ReactNode; label: string; color: string }> = {
  watchlist: { icon: <Bookmark size={18} />, label: 'Watchlist', color: 'watchlist' },
  daily: { icon: <Zap size={18} />, label: 'Daily', color: 'daily' },
  growth: { icon: <TrendingUp size={18} />, label: 'Growth', color: 'growth' },
  value: { icon: <DollarSign size={18} />, label: 'Value', color: 'value' },
  funds: { icon: <Briefcase size={18} />, label: 'Funds', color: 'funds' },
}

interface ProfileSelectorProps {
  onSelectProfile: (scrId: string) => void
  onScreenWatchlist?: () => void
  loading?: boolean
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile, onScreenWatchlist, loading }) => {
  const [activeTab, setActiveTab] = useState<Category>('daily')

  const handleSelectScreener = (scrId: string) => {
    if (scrId === 'watchlist' && onScreenWatchlist) {
      onScreenWatchlist()
    } else {
      onSelectProfile(scrId)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Quick Screens</h2>

      {/* Segmented Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'watchlist' ? styles.active : ''}`}
          onClick={() => setActiveTab('watchlist')}
          title="Screen your watchlist"
        >
          <Bookmark size={16} />
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'daily' ? styles.active : ''}`}
          onClick={() => setActiveTab('daily')}
          title="Daily market movers"
        >
          <Zap size={16} />
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'growth' ? styles.active : ''}`}
          onClick={() => setActiveTab('growth')}
          title="Growth opportunities"
        >
          <TrendingUp size={16} />
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'value' ? styles.active : ''}`}
          onClick={() => setActiveTab('value')}
          title="Value stocks"
        >
          <DollarSign size={16} />
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'funds' ? styles.active : ''}`}
          onClick={() => setActiveTab('funds')}
          title="Fund categories"
        >
          <Briefcase size={16} />
        </button>
      </div>

      {/* Category Label */}
      <div className={styles.categoryHeader}>
        <span className={styles.categoryIcon}>{CATEGORY_INFO[activeTab].icon}</span>
        <span className={styles.categoryLabel}>{CATEGORY_INFO[activeTab].label}</span>
      </div>

      {/* Screeners Grid */}
      <div className={styles.grid}>
        {SCREENERS[activeTab].map((screener) => (
          <button
            key={screener.scrId}
            className={`${styles.screenerCard} ${styles[`category-${CATEGORY_INFO[activeTab].color}`]}`}
            onClick={() => handleSelectScreener(screener.scrId)}
            disabled={loading}
            title={screener.description}
          >
            <div className={styles.label}>{screener.label}</div>
            <div className={styles.description}>{screener.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
