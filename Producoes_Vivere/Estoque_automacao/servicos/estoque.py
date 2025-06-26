import json
from pathlib import Path
from modelos.movimento import Movimento
from modelos.equipamentos import Equipamento

class EstoqueService:
    def __init__(self, db_path="data/dados.json"):
        self.db_path = Path(db_path)
        if not self.db_path.exists():
            with open(self.db_path, 'w') as f:
                json.dump({"equipamentos": [], "movimentos": []}, f)

    def registrar_movimento(self, id_equipamento, tipo, quantidade):
        if tipo not in ["entrada", "saida"]:
            raise ValueError("Tipo deve ser 'entrada' ou 'saida'.")

        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for equipamento in data["equipamentos"]:
            if equipamento["id"] == id_equipamento:
                eqp = Equipamento(
                    id=equipamento["id"],
                    nome=equipamento["nome"],
                    quantidade=equipamento["quantidade"]
                )

                if tipo == "entrada":
                    eqp.adicionar_quantidade(quantidade)
                elif tipo == "saida":
                    eqp.remover_quantidade(quantidade)

                equipamento["quantidade"] = eqp.quantidade

                movimento = Movimento(id_equipamento, tipo, quantidade)
                data["movimentos"].append(movimento.to_dict())

                with open(self.db_path, 'w') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
                return

        raise ValueError("Equipamento não encontrado.")

    def mostrar_disponiveis(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for equipamento in data["equipamentos"]:
            if equipamento["quantidade"] > 0:
                print(f"ID: {equipamento['id']}, Nome: {equipamento['nome']}, Quantidade: {equipamento['quantidade']}")

    def listar_movimentacoes(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for mov in data["movimentos"]:
            print(f"ID Equipamento: {mov['id_equipamento']}, Tipo: {mov['tipo']}, Quantidade: {mov['quantidade']}, Horário: {mov['horario']}")

    def adicionar_equipamento(self, id_equipamento, nome, quantidade):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for equipamento in data["equipamentos"]:
            if equipamento["id"] == id_equipamento:
                raise ValueError("Equipamento já existe.")

        novo_equipamento = {
            "id": id_equipamento,
            "nome": nome,
            "quantidade": quantidade
        }
        data["equipamentos"].append(novo_equipamento)

        with open(self.db_path, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def remover_equipamento(self, id_equipamento):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for i, equipamento in enumerate(data["equipamentos"]):
            if equipamento["id"] == id_equipamento:
                del data["equipamentos"][i]
                break
        else:
            raise ValueError("Equipamento não encontrado.")

        with open(self.db_path, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def buscar_equipamento(self, id_equipamento):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for equipamento in data["equipamentos"]:
            if equipamento["id"] == id_equipamento:
                return equipamento

        raise ValueError("Equipamento não encontrado.")

    def listar_equipamentos(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        return data["equipamentos"]

    def salvar_movimento(self, movimento):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        data["movimentos"].append(movimento.to_dict())

        with open(self.db_path, 'w') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    def carregar_movimentos(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        return [Movimento(**mov) for mov in data["movimentos"]]

    def limpar_estoque(self):
        with open(self.db_path, 'w') as f:
            json.dump({"equipamentos": [], "movimentos": []}, f, ensure_ascii=False, indent=4)

    def verificar_estoque(self, id_equipamento):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        for equipamento in data["equipamentos"]:
            if equipamento["id"] == id_equipamento:
                return equipamento["quantidade"] > 0

        raise ValueError("Equipamento não encontrado.")

    def calcular_total_estoque(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        total = sum(equipamento["quantidade"] for equipamento in data["equipamentos"])
        return total

    def calcular_total_movimentos(self):
        with open(self.db_path, 'r') as f:
            data = json.load(f)

        total = len(data["movimentos"])
        return total
