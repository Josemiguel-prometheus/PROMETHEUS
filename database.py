import sqlite3
import pandas as pd
from datetime import datetime

class PrometheusDB:
    def __init__(self, db_path="data/prometheus.db"):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            # Tabla de Activos
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS assets (
                    symbol TEXT PRIMARY KEY,
                    name TEXT,
                    category TEXT,
                    last_price REAL,
                    change_pct REAL,
                    last_updated TIMESTAMP
                )
            ''')
            # Tabla de Configuración
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS config (
                    key TEXT PRIMARY KEY,
                    value TEXT
                )
            ''')
            # Tabla de Logs (Rigor Sistémico)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TIMESTAMP,
                    level TEXT,
                    message TEXT
                )
            ''')
            conn.commit()

    def log(self, level, message):
        with self._get_connection() as conn:
            conn.execute('INSERT INTO logs (timestamp, level, message) VALUES (?, ?, ?)',
                         (datetime.now(), level, message))

    def get_logs(self, limit=50):
        with self._get_connection() as conn:
            return pd.read_sql_query('SELECT * FROM logs ORDER BY id DESC LIMIT ?', conn, params=(limit,))

    def upsert_asset(self, symbol, name, category, price=0, change=0):
        with self._get_connection() as conn:
            conn.execute('''
                INSERT INTO assets (symbol, name, category, last_price, change_pct, last_updated)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(symbol) DO UPDATE SET
                    last_price=excluded.last_price,
                    change_pct=excluded.change_pct,
                    last_updated=excluded.last_updated
            ''', (symbol, name, category, price, change, datetime.now()))

    def get_assets(self):
        with self._get_connection() as conn:
            return pd.read_sql_query('SELECT * FROM assets', conn)
