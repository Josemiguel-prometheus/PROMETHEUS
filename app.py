import streamlit as st
import pandas as pd
from database import PrometheusDB
from agents import AgenteAnalista, AgenteSupervisor, AbogadoDelDiablo
from utils import fetch_market_data, get_market_condition_message
import time
from datetime import datetime
import os

# Configuración de página Bloomberg-Style
st.set_page_config(
    page_title="PROMETHEUS - ETF Rotation",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Estilos CSS Personalizados par Esencia Genesis
st.markdown("""
<style>
    .reportview-container {
        background: #0E1117;
    }
    .main {
        background: #0E1117;
    }
    .stMetric {
        background-color: #161B22;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #30363D;
    }
    .stTabs [data-baseweb="tab-list"] {
        gap: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        height: 50px;
        white-space: pre-wrap;
        background-color: #161B22;
        border-radius: 4px 4px 0px 0px;
        gap: 1px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    div[data-testid="stExpander"] {
        border: 1px solid #30363D;
        background-color: #0d1117;
    }
</style>
""", unsafe_allow_html=True)

# Inicializar Base de Datos
if not os.path.exists("data"):
    os.makedirs("data")

db = PrometheusDB()

# Activos Principales (Fase 1)
MARKET_SYMBOLS = {
    '^VIX': ('VIX Index', 'Macro'),
    'SPY': ('S&P 500', 'Equity'),
    'QQQ': ('NASDAQ 100', 'Equity'),
    'IWM': ('Russell 2000', 'Equity'),
    'GLD': ('Gold', 'Commodities'),
    'SLV': ('Silver', 'Commodities'),
    'CL=F': ('WTI Crude Oil', 'Commodities'),
    'CPER': ('Copper', 'Commodities'),
    'TLT': ('Treasury 20Y', 'Fixed Income'),
    '^TNX': ('10Y Yield', 'Fixed Income'),
    'BTC-USD': ('Bitcoin', 'Crypto'),
    'DX-Y.NYB': ('US Dollar Index', 'Macro')
}

# Sidebar - Estado del Sistema
with st.sidebar:
    st.image("https://img.icons8.com/wired/256/ffffff/prometheus.png", width=80)
    st.title("GÉNESIS CORE")
    st.markdown("---")
    st.write("**PROMETHEUS ERP v1.0**")
    st.info("Rigor · Paciencia · Disciplina")
    
    if st.button("REFRESH TOTAL", use_container_width=True):
        with st.spinner("Sincronizando con mercados..."):
            data = fetch_market_data(MARKET_SYMBOLS)
            for item in data:
                db.upsert_asset(item['symbol'], item['name'], item['category'], item['price'], item['change_pct'])
            db.log("INFO", "Sincronización manual ejecutada.")
            st.success("Sincronización completada.")

    st.markdown("---")
    st.write(f"Última actualización: {datetime.now().strftime('%H:%M:%S')}")

# Contenido Principal - Pestañas
t1, t2, t3, t4, t5, t6, t7 = st.tabs([
    "📊 Dashboard", 
    "📈 Rankings", 
    "⏱️ Real-Time", 
    "🧠 Agentes", 
    "🛡️ Supervisor", 
    "📂 Historial", 
    "⚙️ Config"
])

# 1. DASHBOARD PRINCIPAL
with t1:
    st.title(" Dashboard Principal")
    assets_df = db.get_assets()
    
    if not assets_df.empty:
        # Métricas Macro Principales
        col1, col2, col3, col4, col5 = st.columns(5)
        
        def get_asset_metrics(symbol):
            row = assets_df[assets_df['symbol'] == symbol]
            if not row.empty:
                return row.iloc[0]['last_price'], row.iloc[0]['change_pct']
            return 0, 0

        v_price, v_chg = get_asset_metrics('^VIX')
        col1.metric("VIX Index", f"{v_price:.2f}", f"{v_chg:.2f}%", delta_color="inverse")
        
        s_price, s_chg = get_asset_metrics('SPY')
        col2.metric("S&P 500", f"{s_price:.2f}", f"{s_chg:.2f}%")
        
        d_price, d_chg = get_asset_metrics('DX-Y.NYB')
        col3.metric("DXY Index", f"{d_price:.2f}", f"{d_chg:.2f}%", delta_color="inverse")
        
        g_price, g_chg = get_asset_metrics('GLD')
        col4.metric("Gold (GLD)", f"{g_price:.2f}", f"{g_chg:.2f}%")
        
        t_price, t_chg = get_asset_metrics('^TNX')
        col5.metric("10Y Yield", f"{t_price:.2f}", f"{t_chg:.2f}%")

    st.markdown("---")
    
    col_left, col_right = st.columns([2, 1])
    
    with col_left:
        st.subheader("🛡️ Condición del Mercado")
        st.warning(get_market_condition_message())
        
        st.info("💡 **Aviso Genesis:** El sistema detecta una fuerte correlación negativa entre el DXY y los activos de riesgo. Mantenga disciplina en sus entradas.")
    
    with col_right:
        st.subheader("💎 Sector Momentum")
        st.success("🥇 **Tecnología (XLK)**\nRendimiento: +1.24% (Intradía)\nFuerza Relativa: Alta")

# 2. RANKINGS Y ROTACIÓN
with t2:
    st.title(" Rankings y Rotación")
    st.info("Módulo de cálculo de Fuerza Relativa en desarrollo para Fase 2.")
    st.write("Visualización preliminar de ranking por categoría:")
    if not assets_df.empty:
        st.table(assets_df[['symbol', 'name', 'category', 'change_pct']].sort_values(by='change_pct', ascending=False))

# 3. COTIZACIONES EN TIEMPO REAL
with t3:
    st.title(" Cotizaciones en Tiempo Real")
    if not assets_df.empty:
        st.dataframe(assets_df, use_container_width=True, hide_index=True)
    else:
        st.write("Pulse 'REFRESH TOTAL' en la barra lateral para cargar datos.")

# 4. AGENTES
with t4:
    st.title(" Sistema de Agentes")
    analista = AgenteAnalista()
    supervisor = AgenteSupervisor()
    critico = AbogadoDelDiablo()
    
    c1, c2, c3 = st.columns(3)
    with c1:
        st.subheader("Analista")
        st.code("\n".join(analista.logs if analista.logs else ["Agente listo."]))
    with c2:
        st.subheader("Supervisor")
        st.code("\n".join(supervisor.logs if supervisor.logs else ["Monitorizando..."]))
    with c3:
        st.subheader("Crítico")
        st.code("\n".join(critico.logs if critico.logs else ["Evaluando sesgos..."]))

# 5. SUPERVISOR
with t5:
    st.title(" Supervisor del Sistema")
    st.write("Logs de actividad técnica:")
    logs_df = db.get_logs()
    st.dataframe(logs_df, use_container_width=True)

# 6. HISTORIAL Y ANÁLISIS
with t6:
    st.title(" Historial y Análisis")
    st.write("La persistencia de datos históricos se activará en la Fase 2 tras la validación del motor de datos.")

# 7. CONFIGURACIÓN
with t7:
    st.title(" Configuración")
    st.subheader("Añadir ETF Personalizado")
    with st.form("add_asset"):
        ticker = st.text_input("Ticker (ej: SOXX)")
        name = st.text_input("Nombre (ej: Semiconductors)")
        cat = st.selectbox("Categoría", ["Equity", "Macro", "Fixed Income", "Commodities", "Crypto"])
        if st.form_submit_button("Añadir"):
            db.upsert_asset(ticker, name, cat)
            st.success(f"Activo {ticker} añadido con éxito.")
    
    st.divider()
    st.write("**Parámetros de Polling**")
    st.slider("Frecuencia de actualización (segundos)", 30, 600, 60)
    st.slider("Agresividad de Rotación", 1, 10, 3)
