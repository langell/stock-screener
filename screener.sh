#!/bin/bash

# Stock Screener CLI Script
# Usage: ./screener.sh [profile] [options]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Please create a .env file with your FMP_API_KEY:"
    echo "  cp .env.example .env"
    echo "  # Edit .env and add your API key from https://site.financialmodelingprep.com/"
    exit 1
fi

# Display help
show_help() {
    cat << EOF
📊 Stock Screener CLI

Usage: $0 [command] [options]

Commands:
  screen [profile]        Run a screening profile
  gap                     Show gap screening examples
  advanced                Run advanced screening with analysis
  help                    Show this help message

Screening Profiles:
  small_cap              Stocks under \$2B market cap
  mid_cap                Stocks \$2B-\$10B market cap
  large_cap              Stocks over \$10B market cap
  mega_cap               Stocks over \$100B market cap
  dividend_aristocrats   High dividend yield stocks (>3%)
  dividend_stocks        Dividend paying stocks (>2%)
  tech_growth            Tech sector with P/E < 40
  value_stocks           Value stocks with P/E < 15
  penny_stocks           Stocks under \$5
  healthcare             Healthcare sector
  finance                Finance sector
  large_gap              Stocks with gap > 20%
  huge_gap               Stocks with gap > 50%
  negative_gap           Stocks that gapped down > 10%

Examples:
  $0 screen tech_growth
  $0 screen large_gap
  $0 gap
  $0 advanced
  $0 help

EOF
}

# Define all available profiles
PROFILES=(
    "small_cap" "mid_cap" "large_cap" "mega_cap"
    "dividend_aristocrats" "dividend_stocks"
    "tech_growth" "value_stocks" "penny_stocks"
    "healthcare" "finance"
    "large_gap" "huge_gap" "negative_gap"
)

# Main script logic
case "${1:-help}" in
    screen)
        PROFILE="${2:-tech_growth}"
        npm run screen -- "$PROFILE"
        ;;
    gap)
        echo "🎯 Running gap screening examples..."
        npm run examples:gap
        ;;
    advanced)
        echo "⭐ Running advanced screening analysis..."
        npm run test:advanced
        ;;
    test)
        echo "🧪 Running test suite..."
        npm test
        ;;
    help|"")
        show_help
        ;;
    *)
        # Check if it's a valid profile name for shortcut
        if [[ " ${PROFILES[@]} " =~ " ${1} " ]]; then
            npm run screen -- "$1"
        else
            echo "❌ Unknown command: $1"
            echo ""
            show_help
            exit 1
        fi
        ;;
esac
