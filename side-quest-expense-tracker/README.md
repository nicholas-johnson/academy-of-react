# Side Quest: Expense Tracker

**A personal finance tracker** — Log transactions, set budgets, and see where your money goes.

## What You'll Build

A practical expense tracking app where you can:
- Log income and expenses with categories
- Set monthly budgets per category
- View spending trends and summaries
- Filter and search transactions
- Export data to CSV

## API Setup

This project uses **localStorage** for persistence — no external API required!

For an optional backend later, consider:
- [JSON Server](https://github.com/typicode/json-server) for mock REST API
- Your own Express/Fastify server
- Firebase/Supabase for real persistence

---

## Module Progression

### After Module 2: Basic Display
- Create a `Transaction` component using JSX
- Display hardcoded transactions (amount, category, date, note)
- Color-code income (green) vs expense (red)

### After Module 3: Props & Composition
- Create `TransactionList`, `Transaction`, and `Balance` components
- Pass transaction data via props
- Compose a summary card showing totals

### After Module 4: State
- Add transaction form (amount, category, type)
- Running balance calculation
- Delete transaction functionality

### After Module 5: Forms
- Full transaction form with validation
- Category selection dropdown
- Date picker
- Edit existing transactions

### After Module 6: Lists & Keys
- Render transactions with proper keys
- Sort by: date, amount, category
- Filter by: category, type, date range

### After Module 7: Effects
- Persist to localStorage
- Load saved transactions on mount
- Auto-calculate monthly summaries
- Optional: Sync to mock API

### After Module 8: Managing State
- Multiple views: Transactions / Budgets / Reports
- Budget tracking per category
- Monthly/yearly overview tabs

### After Module 9: Refs
- Focus amount input on form open
- Scroll to new transaction
- Chart animation triggers

### After Module 10: Context
- Currency context (USD, EUR, GBP, etc.)
- Date format preferences
- Theme (dark/light mode)

### After Module 11: Custom Hooks
- `useTransactions()` — CRUD operations
- `useBudget(category)` — budget tracking with alerts
- `useMonthlyReport(month)` — aggregated statistics

### After Module 12: Performance
- Memoize expensive calculations (totals, averages)
- Virtualized transaction list for large datasets
- Lazy load report/chart components

### After Module 13: Server Rendering
- Server-rendered monthly reports
- Printable expense summaries
- Shareable budget templates

---

## Handling CORS with Vite Proxy

If you add a backend API, use Vite's proxy to avoid CORS issues.

### The Problem

```
Access to fetch at 'http://localhost:3001/api/transactions' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### The Solution: Vite Proxy

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to your backend
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Optional: rewrite path
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### Usage in Your Code

```typescript
// Your backend runs on localhost:3001
// But you call /api from your React app:

const response = await fetch('/api/transactions')
// Vite proxies this to http://localhost:3001/api/transactions
```

### JSON Server Setup (Optional Mock API)

```bash
npm install -D json-server
```

Create `db.json`:

```json
{
  "transactions": [
    { "id": 1, "amount": 2500, "type": "income", "category": "salary", "date": "2024-01-15" },
    { "id": 2, "amount": 50, "type": "expense", "category": "food", "date": "2024-01-16" }
  ],
  "budgets": [
    { "id": 1, "category": "food", "limit": 500 }
  ]
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3001"
  }
}
```

---

## Data Model

```typescript
interface Transaction {
  id: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string // ISO date
  note?: string
}

interface Budget {
  id: string
  category: string
  limit: number
  period: 'monthly' | 'yearly'
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
}
```

## Routes (Module 13+)

```
/                    → Dashboard / Overview
/transactions        → All transactions
/transactions/add    → Add new transaction
/budgets             → Budget management
/reports             → Monthly/yearly reports
/reports/:month      → Specific month report
/settings            → Currency, categories
```

## Resources

- [JSON Server](https://github.com/typicode/json-server)
- [Chart.js](https://www.chartjs.org/) or [Recharts](https://recharts.org/) for visualizations
- [date-fns](https://date-fns.org/) for date manipulation
