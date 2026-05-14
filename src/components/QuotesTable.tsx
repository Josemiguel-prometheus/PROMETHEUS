import { useEffect, useState } from 'react';
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react';
import type { MarketAsset } from '../types';

export default function QuotesTable() {
  const [data, setData] = useState<MarketAsset[]>([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof MarketAsset>('symbol');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('/api/assets').then(r => r.json()).then(setData);
  }, []);

  const filteredData = data
    .filter(a => a.symbol.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortKey] ?? '';
      const valB = b[sortKey] ?? '';
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key: keyof MarketAsset) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Activos en Vigilancia Permanente</h2>
          <p className="text-xs text-slate-500 mt-1">Sincronización directa con Yahoo Finance. Datos depurados por el motor central.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              placeholder="Buscar símbolo o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-bento-card border border-bento-border rounded px-9 py-2 text-xs w-72 focus:outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-slate-700"
            />
          </div>
          <button className="p-2 bg-bento-card text-slate-500 hover:text-white rounded border border-bento-border hover:bg-white/5 transition-all">
            <Download size={16} />
          </button>
        </div>
      </header>

      <div className="bg-bento-card border border-bento-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-black/20 border-b border-white/5">
              <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                <th className="px-6 py-5 cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('symbol')}>Símbolo</th>
                <th className="px-4 py-5 cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('name')}>Nombre del Activo</th>
                <th className="px-4 py-5 cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('category')}>Categoría</th>
                <th className="px-4 py-5 text-right cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('price')}>Cotización</th>
                <th className="px-4 py-5 text-right cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('changePercent')}>Cambio %</th>
                <th className="px-6 py-5 text-right cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('lastUpdated')}>Actualización</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-mono">
              {filteredData.map((row) => (
                <tr key={row.symbol} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-blue-400">{row.symbol.replace('^', '')}</td>
                  <td className="px-4 py-4 text-slate-300 font-medium font-sans">{row.name}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{row.category}</span>
                  </td>
                  <td className="px-4 py-4 text-right text-white font-bold">
                    {row.price ? row.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : '---'}
                  </td>
                  <td className={`px-4 py-4 text-right font-bold ${row.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {row.changePercent >= 0 ? '+' : ''}{row.changePercent?.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 text-[10px]">
                    {new Date(row.lastUpdated).toLocaleTimeString()}
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
