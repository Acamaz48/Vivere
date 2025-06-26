from datetime import datetime
class Movimento:
    def __init__(self, id_equipamento, tipo, quantidade):
        self.id_equipamento = id_equipamento
        self.tipo = tipo
        self.quantidade = quantidade
        self.horario = datetime.now().isoformat()
    
    def __str__(self):
        return (f"Movimento(id_equipamento={self.id_equipamento}, "
                f"tipo='{self.tipo}', quantidade={self.quantidade}, "
                f"horario='{self.horario}')")
    def __repr__(self):
        return self.__str__()
    def to_dict(self):
        return {
            "id_equipamento": self.id_equipamento,
            "tipo": self.tipo,
            "quantidade": self.quantidade,
            "horario": self.horario
        }
    def from_dict(self, data):
        self.id_equipamento = data.get("id_equipamento")
        self.tipo = data.get("tipo")
        self.quantidade = data.get("quantidade")
        self.horario = data.get("horario", datetime.now().isoformat())
        return self