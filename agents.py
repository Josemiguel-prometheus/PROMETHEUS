from datetime import datetime

class PrometheusAgent:
    def __init__(self, name, role, mantra):
        self.name = name
        self.role = role
        self.mantra = mantra

    def say(self, message):
        return f"[{datetime.now().strftime('%H:%M:%S')}] {self.name}: {message}"

def get_agents():
    return {
        "analista": PrometheusAgent(
            "PRO-A (Analista)", 
            "Análisis de Momentum y Correlaciones",
            "La verdad está en los datos, no en las opiniones."
        ),
        "supervisor": PrometheusAgent(
            "PRO-S (Supervisor)", 
            "Gestión de Riesgo y Estabilidad",
            "La preservación del capital es la primera ley."
        ),
        "critico": PrometheusAgent(
            "PRO-D (Crítico)", 
            "Refutación y Dialéctica",
            "Toda tesis sin antítesis es un sesgo."
        )
    }
