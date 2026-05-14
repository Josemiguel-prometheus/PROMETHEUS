import { useEffect, useState } from 'react';
import { Database, Activity, Terminal, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Supervisor() {
  const [logs, setLogs] = useState<{ id: number, timestamp: string, level: string, message: string }[]>([]);
  const [systemStats, setSystemStats] = useState({
    upTime: "99.98%",
    lastSync: "Hace 42 segundos",
    dbSize: "2.4 MB",
    errorCount: 0
  });

  useEffect(() => {
    fetch('/api/logs').then(r => r.json()).then(setLogs);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-light text-white tracking-tight">Panel del Supervisor Central</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Control de integridad, flujos de datos y estabilidad del núcleo PROMETHEUS.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          REINICIAR MOTOR CENTRAL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatusCard icon={Activity} label="Disponibilidad" value={systemStats.upTime} color="text-emerald-500" />
        <StatusCard icon={Database} label="Volumen DB" value={systemStats.dbSize} color="text-blue-500" />
        <StatusCard icon={ShieldCheck} label="Última Sincro" value={systemStats.lastSync} color="text-slate-300" />
        <StatusCard icon={AlertTriangle} label="Fallas Críticas" value={systemStats.errorCount.toString()} color="text-slate-600" />
      </div>

      <div className="bg-bento-card border border-white/5 rounded-xl flex flex-col min-h-[450px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-blue-500" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stream de Registros en Tiempo Real</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] text-slate-600 font-mono font-bold tracking-tighter">DATALAYER ACTIVO</span>
          </div>
        </div>
        
        <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-1.5 selection:bg-blue-500/30">
          {logs.length > 0 ? logs.map((log) => (
            <div key={log.id} className="flex gap-4 hover:bg-white/5 py-1 px-3 rounded transition-colors group">
              <span className="text-slate-700 whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString()}</span>
              <span className={`font-bold w-14 shrink-0 ${log.level === 'ERROR' ? 'text-rose-500' : 'text-blue-500'}`}>[{log.level}]</span>
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">{log.message}</span>
            </div>
          )) : (
            <div className="flex h-full items-center justify-center text-slate-700 italic">
               Sincronizando con el motor de registros...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-bento-card p-5 border border-white/5 rounded-xl hover:bg-white/5 transition-all">
      <div className="flex items-center gap-2 text-slate-600 mb-2">
        <Icon size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
      </div>
      <span className={`text-2xl font-mono font-bold tracking-tighter ${color}`}>{value}</span>
    </div>
  );
}
