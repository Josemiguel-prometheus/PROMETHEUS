import yfinance as yf
from datetime import datetime

def fetch_market_snapshot(symbols_config):
    """
    snapshot: { 'SYMBOL': {'name': 'Nombre', 'cat': 'Categoria'} }
    """
    results = []
    for symbol, meta in symbols_config.items():
        try:
            ticker = yf.Ticker(symbol)
            # Usamos period='1d' para obtener el cierre anterior y el precio actual con precision
            hist = ticker.history(period="2d")
            if len(hist) >= 1:
                current_price = hist['Close'].iloc[-1]
                if len(hist) >= 2:
                    prev_close = hist['Close'].iloc[-2]
                    change_pct = ((current_price - prev_close) / prev_close) * 100
                else:
                    change_pct = 0.0
                
                results.append({
                    'symbol': symbol,
                    'name': meta['name'],
                    'category': meta['cat'],
                    'price': current_price,
                    'change': change_pct
                })
        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
    return results

def get_system_mantra():
    return "RIGOR: El análisis precede a la acción. PACIENCIA: El mercado premia a los disciplinados. DISCIPLINA: El plan se ejecuta sin sesgos."
