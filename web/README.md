# Stock Screener - React Frontend

A modern React-based web interface for the Stock Screener application built with Vite, TypeScript, and Recharts.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API server running on port 5000

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

The app automatically proxies API calls to `http://localhost:5000/api`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Architecture

### Components

- **App.tsx** - Main application component
  - State management for stocks, loading, errors
  - Routes between screens
  
- **ProfileSelector.tsx** - Quick screening profiles
  - Pre-configured screens (Tech Growth, Large Gap, etc.)
  - One-click screening
  
- **ResultsTable.tsx** - Results display
  - Sortable stock data
  - Formatted price, gap, and market cap displays
  - Color-coded gap indicators

- **CustomFilters** - Advanced filtering
  - Market cap range
  - P/E ratio range
  - Dividend yield
  - Gap percentage
  - Sector filtering

### API Client

`src/api/screener.ts` - Axios-based API client

```typescript
screenerApi.screen(filters)           // Universal screening
screenerApi.screenByMarketCap(min, max)  // Market cap screen
screenerApi.screenByPERatio(min, max)    // P/E screen
screenerApi.screenByGap(min, max)        // Gap screen
screenerApi.screenByLargeGap(percentage) // Large gap screen
screenerApi.getStockQuote(symbol)        // Get single quote
```

## Features

### Quick Screens
- **Tech Growth** - Technology sector with P/E < 40
- **Large Gap** - Stocks with daily gap > 20%
- **Huge Gap** - Stocks with daily gap > 50%
- **Dividends** - High dividend yield stocks
- **Large Cap** - Market cap > $10B
- **Small Cap** - Market cap $300M-$2B
- **Value Stocks** - Low P/E < 15

### Custom Filters
- Market cap range (min/max)
- Price range (min/max)
- P/E ratio range (min/max)
- Dividend yield minimum
- Gap percentage range
- Sector selection
- Result limit

### Results Display
- Symbol and company name
- Current price
- Daily gap % (color-coded)
- P/E ratio
- Dividend yield
- Market cap
- Trading volume

## Styling

Global styles are in `src/index.css` with:
- Dark theme (slate/blue color scheme)
- Responsive grid layouts
- Smooth transitions and animations
- Mobile-optimized design

Component-specific styles use CSS Modules:
- `ProfileSelector.module.css`
- `ResultsTable.module.css`
- `App.module.css`

## Environment Variables

Create a `.env` file (or `.env.local` for local overrides):

```
VITE_API_URL=http://localhost:5000/api
```

The API URL defaults to `http://localhost:5000/api` if not specified.

## Performance

- Built with Vite for fast development and builds
- TypeScript for type safety
- Lazy component loading
- Efficient re-renders with React hooks
- Responsive images and lazy loading

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### API Connection Issues

**Error: "Failed to load stocks"**
- Ensure backend server is running on port 5000
- Check firewall settings
- Verify VITE_API_URL environment variable

**CORS Errors**
- Ensure backend has CORS enabled
- Check backend is running before frontend

### Build Issues

**Module not found errors**
```bash
rm -rf node_modules
npm install
```

**Port already in use**
```bash
# Change port in vite.config.ts
server: {
  port: 3001  // or another available port
}
```

## Development Tips

### Adding New Profiles

Edit `src/components/ProfileSelector.tsx`:

```typescript
const PROFILES: Profile[] = [
  { name: 'my_profile', label: 'My Screen', description: 'Description' },
  // ...
]
```

Then handle in `src/App.tsx` switch statement:

```typescript
case 'my_profile':
  response = await screenerApi.screen({ /* filters */ })
  break
```

### Adding New Filters

1. Update `ScreeningFilters` interface in `src/api/screener.ts`
2. Add input field in `CustomFilters` component
3. Handle in filter submission logic

### Adding New Columns

Edit `src/components/ResultsTable.tsx`:

```typescript
<th>New Column</th>
// ...
<td>{stock.newField}</td>
```

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## License

MIT
