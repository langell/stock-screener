#!/bin/bash

# Stock Screener Global Wrapper
# This script can be symlinked to /usr/local/bin for global access
# Usage: ln -s /path/to/stocks/screener-global.sh /usr/local/bin/screener

STOCKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "$STOCKS_DIR/screener.sh" ]; then
    echo "❌ Error: screener.sh not found in $STOCKS_DIR"
    exit 1
fi

# Call the main screener script with all arguments
exec "$STOCKS_DIR/screener.sh" "$@"
