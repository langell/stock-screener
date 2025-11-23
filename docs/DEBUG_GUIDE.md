# Debugging Guide for Stock Screener

This guide explains how to debug the stock screener application - both the frontend React app and backend API server.

## Quick Start

### Debug Server API Only

1. Press `F5` or go to **Run > Start Debugging**
2. Select **"Debug Server"** from the dropdown
3. The server will start with the debugger attached
4. Set breakpoints in `server.ts` and other backend files
5. Click **Stop** or press `Ctrl+C` when done

### Debug Frontend (React) Only

1. Start the React dev server: `cd web && npm run dev`
2. Press `F5` and select **"Attach to React (Vite)"`
3. Open Chrome DevTools with `F12`
4. Set breakpoints in React components
5. Refresh the page to hit breakpoints

### Debug Full Stack (Server + Frontend)

1. Press `F5` and select **"Debug Full Stack"** from the dropdown
2. This will start both the server debugger and attach to React simultaneously
3. Set breakpoints in both `server.ts` and React components
4. The VS Code debugger will pause at breakpoints in either

## Manual Server Startup for Debugging

If you want to start the server manually and attach the debugger:

```bash
# Terminal 1: Start the server in debug mode
node --inspect-brk --import tsx server.ts

# Then in VS Code: Press F5 and select "Attach to Server (Already Running)"
```

## Setting Breakpoints

1. Click on the line number in the editor to set a breakpoint (red dot appears)
2. Conditional breakpoints: Right-click breakpoint → Edit breakpoint → Add condition
3. Logpoint: Right-click line number → Add Logpoint → Enter expression to log

## Debugging Tips

### For Server API

- **Inspect Request/Response**: Set breakpoints in route handlers to see `req` and `res` objects
- **Check Body Data**: Use Debug Console to evaluate `req.body` or `req.params`
- **Trace API Calls**: Add breakpoint in `screenerApi.ts` to debug frontend → backend communication

### For Frontend

- **Inspect State**: Use React DevTools or set breakpoints in component render methods
- **Check API Responses**: Set breakpoint after `axios` call to inspect response data
- **Debug Sorting**: Set breakpoint in `ResultsTable.tsx` `handleSort` function

### Using Debug Console

While debugging, use the Debug Console (bottom panel) to:

- Evaluate expressions: `stocks.filter(s => s.symbol === 'AAPL')`
- Call functions: `screener.screenByMarketCap(1e9, 10e9)`
- Inspect objects: Type variable name to see its contents

## Common Issues

### Breakpoints Not Hitting

1. Make sure source maps are enabled (they are in `vite.config.ts`)
2. Restart the dev server: `npm run dev`
3. Hard refresh the browser: `Ctrl+Shift+R` (Chrome/Firefox)

### Debugger Disconnects

1. The debugger auto-attaches. If it disconnects, restart it: `F5` → select configuration
2. Check the terminal for crashes or errors

### Can't Connect to Port 9229

1. The port might be in use by another process
2. Kill the existing process: `lsof -i :9229` then `kill -9 <PID>`
3. Restart the debugger

## Environment Variables

When debugging, you can set environment variables in the debug configuration:

```json
"env": {
  "NODE_ENV": "development",
  "FMP_API_KEY": "your_key_here"
}
```

## Debug Full Stack Workflow

Example workflow for debugging API calls:

1. Select **"Debug Full Stack"** configuration
2. Set breakpoint in `server.ts` in your API route handler (e.g., line with `screener.screen()`)
3. In React component, call the API (e.g., click a filter button)
4. Debugger pauses at the breakpoint
5. Use Debug Console to inspect `req.body` or intermediate variables
6. Step through code line by line with F10 (Step Over) or F11 (Step Into)
7. Click Resume (F5) to continue

## Useful Keyboard Shortcuts

- **F5**: Start/Continue debugging
- **Shift+F5**: Stop debugging
- **F6**: Pause
- **F9**: Toggle breakpoint
- **F10**: Step Over (next line)
- **F11**: Step Into (enter function)
- **Shift+F11**: Step Out (exit function)
- **Ctrl+Shift+D**: Open Debug view

## Further Reading

- [VS Code Debugging Docs](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
