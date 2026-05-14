import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import Database from "better-sqlite3";
import yahooFinance from "yahoo-finance2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const dbFile = path.join(process.cwd(), 'prometheus.db');
const db = new Database(dbFile);

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS assets (
    symbol TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    sector TEXT,
    price REAL,
    change REAL,
    change_percent REAL,
    last_updated TEXT
  );

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    level TEXT,
    message TEXT
  );
`);

// Assets to monitor (Fase 1)
const INITIAL_ASSETS = [
  { symbol: '^VIX', name: 'VIX Index', category: 'Macro' },
  { symbol: 'GLD', name: 'Gold ETF', category: 'Commodities' },
  { symbol: 'SLV', name: 'Silver ETF', category: 'Commodities' },
  { symbol: 'CL=F', name: 'WTI Crude Oil', category: 'Commodities' },
  { symbol: 'CPER', name: 'Copper ETF', category: 'Commodities' },
  { symbol: 'SPY', name: 'S&P 500 ETF', category: 'Equity' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', category: 'Equity' },
  { symbol: 'EEM', name: 'Emerging Markets ETF', category: 'Equity' },
  { symbol: 'BTC-USD', name: 'Bitcoin', category: 'Crypto' },
  { symbol: '^TNX', name: '10Y Treasury Yield', category: 'Fixed Income' },
  { symbol: '^FVX', name: '5Y Treasury Yield', category: 'Fixed Income' },
  { symbol: 'TLT', name: '20+Y Treasury Bond ETF', category: 'Fixed Income' },
  { symbol: 'HYG', name: 'High Yield Corporate Bond', category: 'Fixed Income' },
  { symbol: 'LQD', name: 'Investment Grade Corp Bond', category: 'Fixed Income' },
  { symbol: 'DX-Y.NYB', name: 'US Dollar Index', category: 'Macro' },
  { symbol: 'BZ=F', name: 'Brent Crude Oil', category: 'Commodities' },
  { symbol: '^MOVE', name: 'MOVE Index (Bond Vol)', category: 'Fixed Income' },
  { symbol: '^DJI', name: 'Dow Jones Industrial', category: 'Equity' },
  { symbol: '^IXIC', name: 'NASDAQ Composite', category: 'Equity' },
  { symbol: 'IWM', name: 'Russell 2000 ETF', category: 'Equity' }
];

// Seed initial assets
const upsertAsset = db.prepare(`
  INSERT INTO assets (symbol, name, category, last_updated)
  VALUES (?, ?, ?, datetime('now'))
  ON CONFLICT(symbol) DO UPDATE SET
    name=excluded.name,
    category=excluded.category
`);

const transaction = db.transaction((assets) => {
  for (const asset of assets) upsertAsset.run(asset.symbol, asset.name, asset.category);
});
transaction(INITIAL_ASSETS);

app.use(cors());
app.use(express.json());

// API Endpoints
app.get("/api/assets", (req, res) => {
  const assets = db.prepare("SELECT * FROM assets").all();
  res.json(assets);
});

app.get("/api/config", (req, res) => {
  const config = db.prepare("SELECT * FROM config").all();
  res.json(config);
});

app.post("/api/config", (req, res) => {
  const { key, value } = req.body;
  db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)").run(key, JSON.stringify(value));
  res.json({ status: "ok" });
});

app.get("/api/logs", (req, res) => {
  const logs = db.prepare("SELECT * FROM logs ORDER BY id DESC LIMIT 50").all();
  res.json(logs);
});

// Polling Logic
async function updateMarketData() {
  console.log("Iniciando rotación de actualización de mercado...");
  try {
    const assets = db.prepare("SELECT symbol FROM assets").all() as { symbol: string }[];
    for (const asset of assets) {
      try {
        const quote: any = await yahooFinance.quote(asset.symbol);
        db.prepare(`
          UPDATE assets SET
            price = ?,
            change = ?,
            change_percent = ?,
            last_updated = datetime('now')
          WHERE symbol = ?
        `).run(quote.regularMarketPrice, quote.regularMarketChange, quote.regularMarketChangePercent, asset.symbol);
      } catch (e) {
        console.error(`Error actualizando ${asset.symbol}:`, e);
      }
    }
    db.prepare("INSERT INTO logs (timestamp, level, message) VALUES (datetime('now'), 'INFO', 'Sincronización de mercado completada con éxito.')").run();
  } catch (error) {
    console.error("Critical polling error:", error);
    db.prepare("INSERT INTO logs (timestamp, level, message) VALUES (datetime('now'), 'ERROR', 'Fallo crítico en sincronización de mercado.')").run();
  }
}

// Start polling
setInterval(updateMarketData, 60000);
updateMarketData(); // Initial run

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PROMETHEUS System Engine running at http://localhost:${PORT}`);
    console.log("Rigor, Paciencia y Disciplina.");
  });
}

startServer();
