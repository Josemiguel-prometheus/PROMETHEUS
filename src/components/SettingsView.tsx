import { useState } from 'react';
import { Save, Plus, Trash2, Globe, Bell, Fingerprint } from 'lucide-react';

export default function SettingsView() {
  const [pollingRate, setPollingRate] = useState(60);
  const [aggressiveness, setAggressiveness] = useState(3);

  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <div className="border-b border-white/5 pb-8">
        <h2 className="text-3xl font-light text-white tracking-tight">Preferencias Avanzadas</h2>
        <p className="text-slate-500 text-sm mt-2 font-medium">Parámetros técnicos de ejecución y algoritmos de rotación selectiva.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
            <Globe size={14} className="text-blue-500" />
            Flujo de Datos
          </h3>
          
          <div className="space-y-8">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest leading-none">Polling Interval (ms)</label>
              <div className="flex items-center gap-6">
                <input 
                  type="range" 
                  min="30" 
                  max="300" 
                  step="30"
                  value={pollingRate}
                  onChange={(e) => setPollingRate(parseInt(e.target.value))}
                  className="flex-1 accent-blue-600 h-1 bg-white/5 rounded-full cursor-pointer"
                />
                <span className="w-16 text-sm font-mono font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/5 text-center">{pollingRate}s</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest leading-none">Agresividad Gamma</label>
              <div className="flex items-center gap-6">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={aggressiveness}
                  onChange={(e) => setAggressiveness(parseInt(e.target.value))}
                  className="flex-1 accent-blue-600 h-1 bg-white/5 rounded-full cursor-pointer"
                />
                <span className="w-16 text-sm font-mono font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/5 text-center">{aggressiveness}</span>
              </div>
              <p className="text-[10px] text-slate-600 mt-3 italic font-medium leading-relaxed uppercase tracking-tighter">
                Valores altos incrementan el turnover, priorizando momentum sobre estabilidad estructural.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
            <Plus size={14} className="text-emerald-500" />
            Vigilancia Personalizada
          </h3>
          
          <div className="bg-bento-card border border-white/5 p-6 rounded-xl space-y-4">
             <div className="flex gap-2">
                <input type="text" placeholder="TICKER" className="bg-black/20 border border-white/5 p-2 text-xs w-24 focus:border-blue-500/50 outline-none font-mono text-white placeholder:text-slate-700" />
                <input type="text" placeholder="Nombre Destino" className="bg-black/20 border border-white/5 p-2 text-xs flex-1 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-700" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors group">
                   <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                </button>
             </div>
             <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                <AssetItem symbol="SOXX" name="Semiconductors ETF" />
                <AssetItem symbol="XLK" name="Technology Select Sector" />
                <AssetItem symbol="XLE" name="Energy Select Sector" />
             </div>
          </div>
        </div>
      </section>

      <section className="bg-bento-card p-8 border border-white/5 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-all">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <Bell size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Alertas de Agentes (Webhooks)</h4>
            <p className="text-xs text-slate-500 font-medium mt-1">Notificaciones push cuando PRO-S detecte divergencias algorítmicas.</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold rounded transition-all uppercase tracking-widest text-slate-400 hover:text-white">
          Configurar Endpoints
        </button>
      </section>

      <div className="pt-12 flex justify-end">
         <button className="flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-xs rounded uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95 shadow-2xl shadow-blue-500/5">
            <Save size={20} />
            GUARDAR CAMBIOS
         </button>
      </div>
    </div>
  );
}

function AssetItem({ symbol, name }: { symbol: string, name: string }) {
  return (
    <div className="flex items-center justify-between text-[11px] font-mono p-3 border border-white/5 bg-black/20 rounded transition-all group hover:bg-white/5">
       <div className="flex gap-4">
          <span className="text-blue-400 font-bold tracking-widest uppercase">{symbol}</span>
          <span className="text-slate-600 group-hover:text-slate-300 transition-colors font-sans font-medium">{name}</span>
       </div>
       <button className="text-slate-800 hover:text-rose-500 transition-colors">
          <Trash2 size={14} />
       </button>
    </div>
  );
}
