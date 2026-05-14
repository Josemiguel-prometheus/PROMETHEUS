import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react';

export default function Rankings() {
  return (
    <div className="space-y-10 max-w-6xl">
      <header className="border-b border-white/5 pb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light text-white tracking-tight">Rankings de Fuerza Relativa</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium italic">Algoritmo de puntuación multi-factor basado en momentum y volatilidad gamma.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-1.5 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Alpha-Engine v1.2</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <RankCard title="ETFs con Mayor Momentum (90d)" items={[
           { name: 'QQQ - Nasdaq 100', score: 94.2, trend: 'up' },
           { name: 'XLK - Technology', score: 88.7, trend: 'up' },
           { name: 'SMH - Semiconductors', score: 85.1, trend: 'down' },
           { name: 'XLY - Cons. Discretionary', score: 79.4, trend: 'up' },
         ]} color="blue" />
         
         <RankCard title="Fuerza Relativa por Sectores GICS" items={[
           { name: 'Tecnología', score: 92.5, trend: 'up' },
           { name: 'Servicios de Com.', score: 84.1, trend: 'up' },
           { name: 'Industria', score: 71.8, trend: 'down' },
           { name: 'Energía', score: 68.4, trend: 'up' },
         ]} color="emerald" />
      </div>

      <div className="bg-bento-card border border-blue-600/20 p-10 rounded-xl space-y-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none group-hover:bg-blue-600/10 transition-all"></div>
         <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-blue-600/10 rounded-lg">
               <Target size={28} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight uppercase tracking-widest">Sugerencia de Rotación Actual</h3>
         </div>
         <p className="text-slate-400 text-lg leading-relaxed max-w-4xl font-light">
            Basado en la convergencia de datos macro y fuerza relativa, el sistema sugiere mantener un sesgo defensivo en activos de crecimiento (Tech) con un ligero incremento en exposición a Commodities industriales debido a la debilidad proyectada del DXY.
         </p>
         <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest transition-all rounded shadow-lg shadow-blue-900/20">EJECUTAR ANÁLISIS ALPHA</button>
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all rounded">DESCARTAR SEÑAL</button>
         </div>
      </div>
    </div>
  );
}

function RankCard({ title, items, color }: { title: string, items: any[], color: 'emerald' | 'blue' }) {
  return (
    <div className="bg-bento-card border border-white/5 rounded-xl flex flex-col overflow-hidden hover:bg-white/5 transition-all">
       <div className="px-6 py-5 bg-black/20 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">{title}</h3>
          <BarChart3 size={14} className="text-slate-700" />
       </div>
       <div className="p-6 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 px-2 rounded transition-all group">
               <span className="text-sm text-slate-400 font-medium group-hover:text-white transition-colors">{item.name}</span>
               <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${item.score}%` }} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white w-10 text-right">{item.score}</span>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}
