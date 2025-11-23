import React, { useState, useEffect } from 'react';
import { Plus, Clipboard, X, Trash2, ChevronDown, ChevronRight, BarChart3 } from 'lucide-react';
import styles from './TickerManager.module.css';
import {
  loadSymbols,
  saveSymbols,
  clearSymbols,
  getWatchlistMetadata,
} from '../services/watchlistService';

interface TickerManagerProps {
  onSymbolsChange?: (symbols: string[]) => void;
}

export const TickerManager: React.FC<TickerManagerProps> = ({ onSymbolsChange }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  // Load symbols on mount
  useEffect(() => {
    const loaded = loadSymbols();
    setSymbols(loaded);
  }, []);

  // Notify parent of changes
  useEffect(() => {
    onSymbolsChange?.(symbols);
  }, [symbols, onSymbolsChange]);

  const handleAddSymbol = (e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const trimmed = inputValue.toUpperCase().trim();
    
    // Validate ticker format
    if (!/^[A-Z0-9\-\.]{1,5}$/.test(trimmed)) {
      setError('Invalid ticker format. Use 1-5 alphanumeric characters.');
      return;
    }

    if (symbols.includes(trimmed)) {
      setError(`${trimmed} is already in your watchlist`);
      return;
    }

    if (symbols.length >= 50) {
      setError('Maximum 50 symbols reached');
      return;
    }

    const newSymbols = [...symbols, trimmed];
    if (saveSymbols(newSymbols)) {
      setSymbols(newSymbols);
      setInputValue('');
      setError('');
      setSuccess(`Added ${trimmed}`);
      setTimeout(() => setSuccess(''), 2000);
    } else {
      setError('Failed to add symbol');
    }
  };

  const handleRemoveSymbol = (symbol: string) => {
    const newSymbols = symbols.filter(s => s !== symbol);
    if (saveSymbols(newSymbols)) {
      setSymbols(newSymbols);
      setSuccess(`Removed ${symbol}`);
      setTimeout(() => setSuccess(''), 2000);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all symbols? This cannot be undone.')) {
      if (clearSymbols()) {
        setSymbols([]);
        setSuccess('Watchlist cleared');
        setTimeout(() => setSuccess(''), 2000);
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const items = text
        .split(/[\s,]+/)
        .map(s => s.toUpperCase().trim())
        .filter(s => s && /^[A-Z0-9\-\.]{1,5}$/.test(s));

      const unique = Array.from(new Set([...symbols, ...items]));
      
      if (unique.length > 50) {
        setError(`Too many symbols. Maximum 50 allowed, got ${unique.length}`);
        return;
      }

      if (saveSymbols(unique)) {
        setSymbols(unique);
        setSuccess(`Added ${items.length} symbol(s)`);
        setTimeout(() => setSuccess(''), 2000);
      }
    } catch (err) {
      setError('Failed to paste symbols');
    }
  };

  const metadata = getWatchlistMetadata();

  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.title}><BarChart3 size={18} /> Ticker Watchlist</span>
        <span className={styles.badge}>{symbols.length}/50</span>
        <span className={styles.arrow}>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.content}>
          {/* Input Section */}
          <div className={styles.inputSection}>
            <form onSubmit={handleAddSymbol} className={styles.form}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value.toUpperCase());
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddSymbol(e);
                }}
                placeholder="Type ticker symbol (e.g., AAPL, MSFT)"
                maxLength={5}
                className={styles.input}
              />
              <button type="submit" className={styles.addBtn}>
                <Plus size={18} /> Add
              </button>
              <button
                type="button"
                onClick={handlePaste}
                className={styles.pasteBtn}
                title="Paste symbols from clipboard (comma or space separated)"
              >
                <Clipboard size={18} />
              </button>
            </form>

            {/* Messages */}
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
          </div>

          {/* Symbols List */}
          <div className={styles.listSection}>
            {symbols.length === 0 ? (
              <p className={styles.emptyState}>No symbols yet. Add one to get started!</p>
            ) : (
              <>
                <div className={styles.symbolsList}>
                  {symbols.map((symbol) => (
                    <div key={symbol} className={styles.symbolTag}>
                      <span>{symbol}</span>
                      <button
                        onClick={() => handleRemoveSymbol(symbol)}
                        className={styles.removeBtn}
                        title={`Remove ${symbol}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <small>
                    {metadata.lastUpdated && (
                      <>Last updated: {metadata.lastUpdated.toLocaleString()}</>
                    )}
                  </small>
                  <button
                    onClick={handleClear}
                    className={styles.clearBtn}
                  >
                    <Trash2 size={14} /> Clear All
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
