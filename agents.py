import datetime

class BaseAgente:
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.logs = []

    def registrar_log(self, mensaje):
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        self.logs.append(f"[{timestamp}] {self.name}: {mensaje}")

class AgenteAnalista(BaseAgente):
    def __init__(self):
        super().__init__("PRO-A (Analista)", "Análisis Macroeconómico y Momentum")

    def analizar(self, market_data):
        self.registrar_log("Iniciando análisis de correlaciones inter-mercado...")
        # Lógica placeholder para Fase 1
        return "El mercado muestra neutralidad constructiva. Mantener rigor en SL."

class AgenteSupervisor(BaseAgente):
    def __init__(self):
        super().__init__("PRO-S (Supervisor)", "Gestión de Riesgos y Cumplimiento")

    def validar(self, propuesta):
        self.registrar_log("Validando niveles de riesgo sistémico...")
        return True

class AbogadoDelDiablo(BaseAgente):
    def __init__(self):
        super().__init__("PRO-D (Crítico)", "Refutación Dialéctica")

    def contradecir(self, tesis):
        self.registrar_log("Buscando fallos en la hipótesis de momentum...")
        return "¿Se ha considerado la inversión de la curva como cisne negro inmediato?"
