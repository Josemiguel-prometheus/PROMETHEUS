import sqlite3
import pandas as pd
from datetime import datetime
import os

class PrometheusDB:
    def __init__(self, db_path="data/prometheus.db"):
        self.db_path = db_path
        if not os.path.exists("data"):
            os.makedirs("data")
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            # Tabla de Activos Principal
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS assets (
                    symbol TEXT PRIMARY KEY,
                    name TEXT,
                    category TEXT,
                    price REAL,
                    change_pct REAL,
                    last_updated TIMESTAMP
                )
            ''')
            # Bitácora de Agentes (Rigor Sistémico)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS agent_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    agent_name TEXT,
                    timestamp TIMESTAMP,
                    message TEXT
                )
            ''')
            conn.commit()

    def log_agent_action(self, agent_name, message):
        with self._get_connection() as conn:
            conn.execute('INSERT INTO agent_logs (agent_name, timestamp, message) VALUES (?, ?, ?)',
                         (agent_name, datetime.now(), message))

    def get_logs(self, limit=50):
        with self._get_connection() as conn:
            return pd.read_sql_query('SELECT * FROM agent_logs ORDER BY id DESC LIMIT ?', conn, params=(limit,))

    def update_asset(self, symbol, name, category, price, change):
        with self._get_connection() as conn:
            conn.execute('''
                INSERT INTO assets (symbol, name, category, price, change_pct, last_updated)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(symbol) DO UPDATE SET
                    price=excluded.price,
                    change_pct=excluded.change_pct,
                    last_updated=excluded.last_updated
            ''', (symbol, name, category, price, change, datetime.now()))

    def get_all_assets(self):
        with self._get_connection() as conn:
            return pd.read_sql_query('SELECT * FROM assets ORDER BY category, symbol', conn)
