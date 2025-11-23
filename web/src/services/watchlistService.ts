// Local storage utilities for managing saved ticker symbols

const STORAGE_KEY = 'watchlist_symbols';
const MAX_SYMBOLS = 50;

export interface WatchlistData {
  symbols: string[];
  lastUpdated: number;
}

/**
 * Save ticker symbols to local storage
 */
export function saveSymbols(symbols: string[]): boolean {
  try {
    // Validate and deduplicate
    const cleaned = Array.from(new Set(
      symbols
        .map(s => s.toUpperCase().trim())
        .filter(s => /^[A-Z0-9\-\.]{1,5}$/.test(s)) // Valid stock ticker format
    ));

    if (cleaned.length > MAX_SYMBOLS) {
      console.warn(`Maximum ${MAX_SYMBOLS} symbols allowed`);
      return false;
    }

    const data: WatchlistData = {
      symbols: cleaned,
      lastUpdated: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save symbols:', error);
    return false;
  }
}

/**
 * Load ticker symbols from local storage
 */
export function loadSymbols(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed: WatchlistData = JSON.parse(data);
    return Array.isArray(parsed.symbols) ? parsed.symbols : [];
  } catch (error) {
    console.error('Failed to load symbols:', error);
    return [];
  }
}

/**
 * Add a single symbol to the watchlist
 */
export function addSymbol(symbol: string): boolean {
  const symbols = loadSymbols();
  const cleaned = symbol.toUpperCase().trim();

  if (!/^[A-Z0-9\-\.]{1,5}$/.test(cleaned)) {
    console.warn(`Invalid ticker symbol: ${symbol}`);
    return false;
  }

  if (symbols.includes(cleaned)) {
    return false; // Already exists
  }

  if (symbols.length >= MAX_SYMBOLS) {
    console.warn(`Maximum ${MAX_SYMBOLS} symbols reached`);
    return false;
  }

  symbols.push(cleaned);
  return saveSymbols(symbols);
}

/**
 * Remove a symbol from the watchlist
 */
export function removeSymbol(symbol: string): boolean {
  const symbols = loadSymbols();
  const cleaned = symbol.toUpperCase().trim();
  const filtered = symbols.filter(s => s !== cleaned);

  if (filtered.length === symbols.length) {
    return false; // Symbol not found
  }

  return saveSymbols(filtered);
}

/**
 * Clear all symbols
 */
export function clearSymbols(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear symbols:', error);
    return false;
  }
}

/**
 * Get metadata about the watchlist
 */
export function getWatchlistMetadata(): { count: number; lastUpdated: Date | null } {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { count: 0, lastUpdated: null };

    const parsed: WatchlistData = JSON.parse(data);
    return {
      count: Array.isArray(parsed.symbols) ? parsed.symbols.length : 0,
      lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : null,
    };
  } catch (error) {
    console.error('Failed to get metadata:', error);
    return { count: 0, lastUpdated: null };
  }
}
