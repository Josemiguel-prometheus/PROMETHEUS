import { Brain, UserCheck, ShieldAlert, Clock, MessageSquare, Scale } from 'lucide-react';
import { motion } from 'motion/react';

export default function Agents() {
  const agents = [
    {
      id: 'analysta',
      name: 'Agente Analista (PRO-A)',
      role: 'Analista Macro y de Datos',
      description: 'Especializado en correlaciones inter-mercado, flujos de liquidez y fuerza relativa entre sectores GICS.',
      status: 'Procesando Datos',
      color: 'blue',
      icon: Brain,
      mantra: "Sin rigor, el análisis es solo opinión."
    },
    {
      id: 'supervisor',
      name: 'Agente Supervisor (PRO-S)',
      role: 'Control de Riesgos y Cumplimiento',
      description: 'Encargado de validar que toda propuesta de rotación cumpla con los parámetros de preservación de capital.',
      status: 'Vigilando',
      color: 'emerald',
      icon: UserCheck,
      mantra: "La protección del principal es la primera ley."
    },
    {
      id: 'abogado',
      name: 'Abogado del Diablo (PRO-D)',
      role: 'Crítico de Hipótesis',
      description: 'Su función es refutar activamente las señales del Analista para evitar sesgos de confirmación.',
      status: 'En Espera',
      color: 'rose',
      icon: Scale,
      mantra: "¿Y si estamos equivocados? Demuestre lo contrario."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-white/5 pb-8">
        <h2 className="text-3xl font-light text-white tracking-tight">Infraestructura de Inteligencia</h2>
        <p className="text-slate-500 text-sm mt-2 font-medium">Ecosistema de agentes especializados bajo la esencia Genesis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-bento-card border border-white/5 rounded-xl overflow-hidden flex flex-col group hover:border-white/10 transition-all hover:bg-white/5"
          >
            <div className="p-8 flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-blue-500 group-hover:text-white transition-colors">
                  <agent.icon size={28} />
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Operatividad</span>
                   <span className="text-xs font-mono font-bold text-slate-300">{agent.status}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{agent.name}</h3>
                <p className="text-blue-500 text-[10px] font-mono font-bold uppercase tracking-widest mt-1 opacity-80">{agent.role}</p>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed min-h-[70px] font-medium">
                {agent.description}
              </p>

              <div className="pt-6 border-t border-white/5">
                 <p className="text-[11px] text-slate-400 italic font-light leading-relaxed">"{agent.mantra}"</p>
              </div>
            </div>
            
            <div className="px-8 py-5 bg-black/20 border-t border-white/5">
               <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all rounded text-slate-400 hover:text-white">
                 <MessageSquare size={14} />
                 Acceder a Bitácora
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-bento-card border border-white/5 p-12 rounded-xl text-center space-y-6 max-w-4xl mx-auto mt-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
        <h3 className="text-xl font-bold text-white tracking-widest uppercase">Protocolo de Decisión Colegiada</h3>
        <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed font-light">
          Ninguna operación es ejecutada sin el consenso de los tres niveles. 
          El sistema PROMETHEUS sintetiza perspectivas opuestas para garantizar la certeza matemática.
        </p>
        <div className="flex justify-center gap-16 pt-6">
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-mono font-bold text-white tracking-tighter">0.999</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Confianza</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-mono font-bold text-white tracking-tighter">24h</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Reflexión</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-mono font-bold text-white tracking-tighter">GICS</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Sectores</span>
           </div>
        </div>
      </section>
    </div>
  );
}
