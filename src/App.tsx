import { useState } from 'react';
import { LayoutDashboard, TrendingUp, Table, Users, Search, History, Settings, RefreshCw, ShieldCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import QuotesTable from './components/QuotesTable';
import Agents from './components/Agents';
import SettingsView from './components/SettingsView';
import Supervisor from './components/Supervisor';
import Rankings from './components/Rankings';
import HistoryView from './components/HistoryView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = [
    { id: 'dashboard', label: '1. Dashboard Principal', icon: LayoutDashboard },
    { id: 'rankings', label: '2. Rankings y Rotación', icon: TrendingUp },
    { id: 'quotes', label: '3. Cotizaciones Real-Time', icon: Table },
    { id: 'agents', label: '4. Sistema de Agentes', icon: Users },
    { id: 'supervisor', label: '5. Panel Supervisor', icon: ShieldCheck },
    { id: 'history', label: '6. Historial y Análisis', icon: History },
    { id: 'settings', label: '7. Configuración Avanzada', icon: Settings },
  ];

  const handleGlobalRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="flex h-screen bg-bento-bg text-slate-300 overflow-hidden font-sans select-none">
      {/* Sidebar Nav */}
      <aside className="w-64 border-r border-bento-border flex flex-col bg-bento-surface">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
              P
            </div>
            <h1 className="text-lg font-semibold tracking-tighter text-white">PROMETHEUS</h1>
          </div>
          
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 whitespace-nowrap">Inteligencia Genesis</div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all border ${
                  activeTab === tab.id
                    ? 'bg-blue-600/10 text-blue-400 border-blue-600/20'
                    : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-sm font-medium tracking-tight whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-bento-border bg-black/20">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Esencia Genesis</div>
          <p className="text-[11px] leading-relaxed italic text-slate-400 font-light">
            "La paciencia es el rigor que separa al especulador del inversor senior."
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-bento-border px-8 flex items-center justify-between bg-bento-surface shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
              <span className="text-[11px] font-mono font-medium text-slate-300">CONECTADO: YAHOO FINANCE</span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <span className="text-[11px] text-slate-500 font-mono italic uppercase">Polling: 60s (Cache Activo)</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500 font-mono">Ult. Act: 12:45:02</span>
            <button
              onClick={handleGlobalRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded text-[11px] hover:bg-white/10 transition-all font-bold tracking-tight text-white disabled:opacity-50"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              REFRESH TOTAL
            </button>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-8 w-full max-w-[1400px] mx-auto h-full"
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'rankings' && <Rankings />}
              {activeTab === 'quotes' && <QuotesTable />}
              {activeTab === 'agents' && <Agents />}
              {activeTab === 'supervisor' && <Supervisor />}
              {activeTab === 'history' && <HistoryView />}
              {activeTab === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
