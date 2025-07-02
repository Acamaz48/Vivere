import mysql.connector
from modelos.movimento import Movimento
from modelos.equipamentos import Equipamento
from datetime import datetime

class EstoqueService:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='Art_@2002',
            database='vivere_estoque'
        )
        self.cursor = self.conn.cursor()

    def registrar_movimento(self, nome_material, tipo, quantidade):
        if tipo not in ["entrada", "saida"]:
            raise ValueError("Tipo deve ser 'entrada' ou 'saida'.")

        equipamento = self.buscar_equipamento(nome_material)
        if not equipamento:
            raise ValueError("Equipamento não encontrado.")

        quantidade = int(quantidade)
        if tipo == "saida" and equipamento['quantidade'] < quantidade:
            raise ValueError("Quantidade insuficiente para saída.")

        nova_quantidade = equipamento['quantidade'] + quantidade if tipo == "entrada" else equipamento['quantidade'] - quantidade

        self.cursor.execute("""
            UPDATE inventario SET quantidade = %s WHERE material = %s
        """, (nova_quantidade, nome_material))

        horario = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.cursor.execute("""
            INSERT INTO movimentos (material, tipo, quantidade, horario) VALUES (%s, %s, %s, %s)
        """, (nome_material, tipo, quantidade, horario))

        self.conn.commit()

    def mostrar_disponiveis(self):
        self.cursor.execute("SELECT material, quantidade FROM inventario WHERE quantidade > 0")
        for nome, qtd in self.cursor.fetchall():
            print(f"Nome: {nome}, Quantidade: {qtd}")

    def listar_movimentacoes(self):
        self.cursor.execute("SELECT material, tipo, quantidade, horario FROM movimentos")
        for material, tipo, qtd, horario in self.cursor.fetchall():
            print(f"Material: {material}, Tipo: {tipo}, Quantidade: {qtd}, Horário: {horario}")

    def adicionar_equipamento(self, nome_material, quantidade):
        self.cursor.execute("SELECT COUNT(*) FROM inventario WHERE material = %s", (nome_material,))
        if self.cursor.fetchone()[0] > 0:
            raise ValueError("Equipamento já existe.")

        self.cursor.execute("""
            INSERT INTO inventario (material, quantidade) VALUES (%s, %s)
        """, (nome_material, quantidade))
        self.conn.commit()

    def remover_equipamento(self, nome_material):
        self.cursor.execute("DELETE FROM inventario WHERE material = %s", (nome_material,))
        self.conn.commit()

    def buscar_equipamento(self, nome_material):
        self.cursor.execute("SELECT material, quantidade FROM inventario WHERE material = %s", (nome_material,))
        row = self.cursor.fetchone()
        if row:
            return {"nome": row[0], "quantidade": row[1]}
        return None

    def listar_equipamentos(self):
        self.cursor.execute("SELECT material, quantidade FROM inventario")
        return self.cursor.fetchall()

    def limpar_estoque(self):
        self.cursor.execute("DELETE FROM inventario")
        self.cursor.execute("DELETE FROM movimentos")
        self.conn.commit()

    def verificar_estoque(self, nome_material):
        equipamento = self.buscar_equipamento(nome_material)
        return equipamento and equipamento['quantidade'] > 0

    def calcular_total_estoque(self):
        self.cursor.execute("SELECT SUM(quantidade) FROM inventario")
        total = self.cursor.fetchone()[0]
        return total or 0

    def calcular_total_movimentos(self):
        self.cursor.execute("SELECT COUNT(*) FROM movimentos")
        total = self.cursor.fetchone()[0]
        return total or 0

    def __del__(self):
        if self.conn.is_connected():
            self.cursor.close()
            self.conn.close()
