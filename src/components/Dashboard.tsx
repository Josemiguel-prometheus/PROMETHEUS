import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, ShieldAlert, Zap } from 'lucide-react';
import type { MarketAsset } from '../types';

export default function Dashboard() {
  const [marketData, setMarketData] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/assets');
        const data = await res.json();
        setMarketData(data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-6 gap-4 min-h-[800px] pb-12">
      {/* Row 1: Macro Tickers */}
      {loading ? (
        Array(4).fill(0).map((_, i) => (
          <div key={i} className="bg-bento-card border border-bento-border rounded-lg animate-pulse" />
        ))
      ) : (
        marketData.filter(a => ['^VIX', 'SPY', '^TNX', 'GLD'].includes(a.symbol)).map((asset) => (
          <div key={asset.symbol} className="bg-bento-card border border-bento-border rounded-lg p-4 flex flex-col justify-between hover:bg-white/5 transition-all">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{asset.name.split(' ')[0]} {asset.symbol.replace('^', '')}</div>
            <div className="text-2xl font-mono text-white tracking-tighter">
              {asset.price ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '---'}
            </div>
            <div className={`text-xs font-mono font-bold ${asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {asset.change >= 0 ? '+' : ''}{asset.changePercent?.toFixed(2)}%
            </div>
          </div>
        ))
      )}

      {/* Row 2-4: Main Condition Display */}
      <div className="col-span-3 row-span-3 bg-bento-card border border-bento-border rounded-lg p-8 relative overflow-hidden flex flex-col">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Condiciones Actuales de Mercado</h2>
            <p className="text-4xl font-light text-white tracking-tight">Neutralidad con Sesgo Alcista</p>
          </div>
          <div className="bg-blue-600/10 border border-blue-600/30 text-blue-400 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest">
            SISTEMA: ESTABLE
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <p className="text-xl leading-relaxed text-slate-400 mb-8 font-light italic">
            "Los datos de volatilidad implícita sugieren una ventana de oportunidad en el sector energético. La rotación hacia defensivos debe ejecutarse con disciplina matemática y sin urgencia emocional."
          </p>
          <div className="flex gap-4">
            <div className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">Rigor Activo</div>
            <div className="px-5 py-2 bg-white/5 border border-white/10 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">Baja Exposición</div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-6 pt-8 border-t border-white/5">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-600 uppercase">Liquidez M2</span>
             <span className="text-sm font-bold text-white">Neutral</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-600 uppercase">Curva Yield</span>
             <span className="text-sm font-bold text-rose-500">Invertida</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-600 uppercase">Impulso</span>
             <span className="text-sm font-bold text-emerald-500">Momentum</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold text-slate-600 uppercase">Sentimiento</span>
             <span className="text-sm font-bold text-blue-400">Optimista</span>
           </div>
        </div>
      </div>

      {/* Sector Leader Side Widget */}
      <div className="col-span-1 row-span-3 bg-bento-card border border-bento-border rounded-lg p-6 flex flex-col hover:bg-white/5 transition-all">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Sector Líder (Daily)</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold font-mono text-white mb-2 tracking-tighter">XLE</div>
          <div className="text-lg text-emerald-400 font-mono font-bold mb-6">+2.41%</div>
          <div className="w-full h-px bg-white/5 mb-6"></div>
          <p className="text-[11px] text-slate-500 uppercase leading-relaxed tracking-tight group-hover:text-slate-400">
            Energía lidera momentum impulsado por el WTI y debilidad temporal del DXY.
          </p>
        </div>
        <button className="mt-8 py-2 bg-white/5 hover:bg-white/10 text-[10px] text-white font-bold uppercase tracking-widest transition-all rounded">
          Ver Análisis Completo
        </button>
      </div>

      {/* Row 5-6: Real Time Data Snapshot */}
      <div className="col-span-4 row-span-2 bg-bento-card border border-bento-border rounded-lg overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-black/20 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monitor de Alta Frecuencia</h3>
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-emerald-500"></div> STREAMS: 128</span>
                <span>LATENCIA: 12ms</span>
            </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Activo</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Precio</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Var %</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estado Genesis</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-mono font-medium">
              {marketData.slice(0, 4).map((asset) => (
                <tr key={asset.symbol} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-3 text-white font-bold">{asset.symbol.replace('^', '')}</td>
                  <td className="px-6 py-3 text-right">{asset.price?.toLocaleString()}</td>
                  <td className={`px-6 py-3 text-right font-bold ${asset.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent?.toFixed(2)}%
                  </td>
                  <td className="px-6 py-3 text-slate-500 uppercase text-[10px]">{asset.category}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded italic ${asset.changePercent >= 0 ? 'bg-emerald-900/40 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {asset.changePercent >= 0 ? 'Estable' : 'Observación'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-[#444] uppercase font-mono">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
  );
}

function SectorRow({ name, change }: { name: string, change: number }) {
  return (
    <div className="flex items-center justify-between py-1 px-2 hover:bg-[#141416] rounded-sm transition-colors group">
      <span className="text-xs text-[#bbb] group-hover:text-white font-medium">{name}</span>
      <div className={`flex items-center gap-1 font-mono text-xs font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {Math.abs(change)}%
      </div>
    </div>
  );
}
