import { History, Calendar, Filter, Search } from 'lucide-react';

export default function HistoryView() {
  return (
    <div className="space-y-8">
      <header className="border-b border-white/5 pb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-light text-white tracking-tight">Historial de Decisiones</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Bitácora inmutable de señales emitidas y rotaciones sugeridas por PROMETHEUS.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 rounded transition-all uppercase tracking-widest">
          <Filter size={14} />
          Filtrar Nodo Temp.
        </button>
      </header>

      <div className="bg-bento-card border border-white/5 rounded-xl min-h-[500px] flex items-center justify-center">
        <div className="p-12 text-center space-y-6 max-w-xl">
           <div className="flex justify-center flex-col items-center gap-6 text-slate-800">
              <History size={80} strokeWidth={0.5} className="opacity-50" />
              <p className="text-sm font-mono font-bold uppercase tracking-[0.4em] text-slate-600">Sin Registros en Snapshot Actual</p>
           </div>
           <p className="text-slate-500 text-sm leading-relaxed font-light italic">
             La base de datos histórica comenzará a poblarse tras el primer ciclo completo de ejecución del motor de análisis (Fase 2). Los datos actuales se mantienen en el datalayer volátil.
           </p>
           <div className="pt-8">
              <button className="px-10 py-3 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:border-blue-500/50 hover:text-blue-400 transition-all rounded">
                 Sincronizar Cluster Histórico
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
