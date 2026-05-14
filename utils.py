import yfinance as yf
import pandas as pd
from datetime import datetime

def fetch_market_data(symbols_dict):
    """
    symbols_dict: { 'SPY': ('S&P 500', 'Equity'), ... }
    """
    results = []
    for symbol, (name, category) in symbols_dict.items():
        try:
            ticker = yf.Ticker(symbol)
            stats = ticker.fast_info
            price = stats.last_price
            # yfinance a veces no da el cambio directamente en fast_info, calculamos si es posible
            # o usamos history para mayor rigor
            change_pct = 0
            history = ticker.history(period="2d")
            if len(history) >= 2:
                prev_close = history['Close'].iloc[-2]
                current_price = history['Close'].iloc[-1]
                change_pct = ((current_price - prev_close) / prev_close) * 100
                price = current_price

            results.append({
                'symbol': symbol,
                'name': name,
                'category': category,
                'price': price,
                'change_pct': change_pct
            })
        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
    return results

def get_market_condition_message():
    # Mensaje basado en la Esencia Genesis
    return (
        "RIGOR MATEMÁTICO: Las condiciones actuales sugieren una consolidación estructural. "
        "No se recomienda rotación agresiva. La PACIENCIA es nuestra mayor ventaja competitiva."
    )
