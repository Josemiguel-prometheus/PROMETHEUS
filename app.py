import streamlit as st
import pandas as pd
from database import PrometheusDB
from utils import fetch_market_snapshot, get_system_mantra
from agents import get_agents
import time
from datetime import datetime

# --- CONFIGURACIÓN DE PÁGINA ---
st.set_page_config(
    page_title="PROMETHEUS GENESIS",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- INICIALIZACIÓN ---
db = PrometheusDB()
agents = get_agents()

# Lista de activos por defecto para Fase 1
DEFAULT_ASSETS = {
    'SPY': {'name': 'S&P 500 ETF', 'cat': 'Equity'},
    'QQQ': {'name': 'Nasdaq 100 ETF', 'cat': 'Equity'},
    'TLT': {'name': '20+ Year Treasury', 'cat': 'Fixed Income'},
    'GLD': {'name': 'SPDR Gold Shares', 'cat': 'Commodities'},
    'BTC-USD': {'name': 'Bitcoin', 'cat': 'Crypto'},
    '^VIX': {'name': 'CBOE Volatility Index', 'cat': 'Macro'},
    'DX-Y.NYB': {'name': 'US Dollar Index', 'cat': 'Macro'}
}

# --- SIDEBAR: CONTROL CENTRAL ---
with st.sidebar:
    st.title("🔥 PROMETHEUS CORE")
    st.subheader("Fase 1: Genesis")
    st.markdown("---")
    
    st.info(get_system_mantra())
    
    st.markdown("### Acciones de Operatividad")
    if st.button("Sincronizar Mercados", use_container_width=True):
        with st.spinner("Conectando con terminales financieras..."):
            data = fetch_market_snapshot(DEFAULT_ASSETS)
            for item in data:
                db.update_asset(item['symbol'], item['name'], item['category'], item['price'], item['change'])
            db.log_agent_action("PRO-S", "Sincronización de mercado completada exitosamente.")
            st.success("Mercados actualizados.")
            st.rerun()

    st.markdown("---")
    st.caption(f"Kernel Online: {datetime.now().strftime('%Y-%m-%d %H:%M')}")

# --- CONTENIDO PRINCIPAL ---
st.title("Sistema de Inteligencia de Rotación")

tabs = st.tabs(["📊 Vista Principal", "📈 Activos", "🧠 Agentes", "🛡️ Supervisor", "⚙️ Config"])

# 1. VISTA PRINCIPAL (Bloomberg-esque)
with tabs[0]:
    assets_df = db.get_all_assets()
    
    if not assets_df.empty:
        # Fila de métricas clave (Stables)
        metrics_cols = st.columns(len(assets_df))
        for i, (idx, row) in enumerate(assets_df.iterrows()):
            with metrics_cols[i % len(metrics_cols)]:
                # Evitamos delta_color dinámico complejo para prevenir el error removeChild
                st.metric(
                    label=row['symbol'], 
                    value=f"{row['price']:.2f}",
                    delta=f"{row['change_pct']:.2f}%"
                )
        
        st.markdown("---")
        
        col_msg, col_stats = st.columns([2, 1])
        with col_msg:
            st.subheader("Estado del Algoritmo GÉNESIS")
            st.warning("DIAGNÓSTICO: El mercado se encuentra en una fase de consolidación técnica. No se detectan señales de rotación crítica en este nodo temporal.")
        
        with col_stats:
            st.subheader("Fuerza Relativa (Proxy)")
            # Fake data para Fase 1 UI
            st.progress(0.75, text="Equity Momentum")
            st.progress(0.40, text="Fixed Income Risk")
    else:
        st.warning("No hay datos en el sistema. Ejecute la sincronización desde el panel lateral.")

# 2. TABLA DE ACTIVOS
with tabs[1]:
    st.subheader("Monitor de Activos en Vigilancia")
    if not assets_df.empty:
        st.dataframe(
            assets_df[['symbol', 'name', 'category', 'price', 'change_pct', 'last_updated']], 
            use_container_width=True, 
            hide_index=True
        )
    else:
        st.info("Sincronice para ver la lista de activos.")

# 3. AGENTES
with tabs[2]:
    st.subheader("Comité de Inteligencia PROMETHEUS")
    
    c1, c2, c3 = st.columns(3)
    
    with c1:
        st.markdown(f"### {agents['analista'].name}")
        st.caption(agents['analista'].role)
        st.italic(f'"{agents["analista"].mantra}"')
        st.button("Consultar Analista", key="btn_a")
        
    with c2:
        st.markdown(f"### {agents['supervisor'].name}")
        st.caption(agents['supervisor'].role)
        st.italic(f'"{agents["supervisor"].mantra}"')
        st.button("Validar Riesgo", key="btn_s")

    with c3:
        st.markdown(f"### {agents['critico'].name}")
        st.caption(agents['critico'].role)
        st.italic(f'"{agents["critico"].mantra}"')
        st.button("Invocar Crítica", key="btn_d")

# 4. SUPERVISOR (LOGS)
with tabs[3]:
    st.subheader("Bitácora de Eventos Sistémicos")
    logs = db.get_logs()
    if not logs.empty:
        st.dataframe(logs, use_container_width=True, hide_index=True)
    else:
        st.caption("Esperando eventos...")

# 5. CONFIGURACIÓN
with tabs[4]:
    st.subheader("Ajustes del Entorno")
    st.toggle("Modo de Alta Precisión", value=True)
    st.slider("Agresividad del Algoritmo (Beta)", 1, 10, 3)
    st.divider()
    st.button("Purgar Base de Datos (Hard Reset)", type="secondary")
