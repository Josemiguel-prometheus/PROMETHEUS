# PROMETHEUS - ETF Rotation Intelligence System

## Arquitectura de Fase 1 (Genesis)

Este sistema ha sido diseñado como una **Aplicación Web Full-Stack de Alto Rendimiento** para cumplir con los estándares de rigor y precisión matemática solicitados.

### Componentes:
- **Frontend:** React 19 + Tailwind CSS (Diseño tipo Bloomberg/Bento).
- **Backend:** Node.js (Express) con motor de polling asíncrono.
- **Base de Datos:** SQLite (Persistencia local ultra-rápida).
- **Datos:** Yahoo Finance (vía `yahoo-finance2`).

### Cómo ejecutar localmente:
1. Instalar dependencias: `npm install`
2. Iniciar en modo desarrollo: `npm run dev`
3. Construir para producción: `npm run build`

### Filosofía del Sistema:
"Rigor, Paciencia y Disciplina". El sistema no busca la rapidez, busca la certeza. Los agentes (Analista, Supervisor, Abogado del Diablo) operan en un ciclo de decisión colegiada que garantiza la estabilidad a largo plazo.

---
*Nota: Si requiere una versión específica para Streamlit Community Cloud, los scripts de lógica en `server.ts` pueden ser portados a Python, pero se recomienda esta arquitectura para mantener la esencia Genesis de estabilidad 24/7.*
