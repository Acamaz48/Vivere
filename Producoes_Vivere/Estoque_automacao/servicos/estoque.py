import mysql.connector
from modelos.movimento import Movimento
from modelos.equipamentos import Equipamento
from datetime import datetime
from tabulate import tabulate

class EstoqueService:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='Art_@2002',
            database='vivere_estoque'
        )

    def registrar_movimento(self, nome_material, tipo, quantidade):
        equipamento = self.buscar_equipamento(nome_material)
        if not equipamento:
            raise ValueError("Equipamento não encontrado.")

        quantidade = int(quantidade)
        if tipo not in ["entrada", "saida"]:
            raise ValueError("Tipo inválido.")

        if tipo == "saida" and equipamento['quantidade'] < quantidade:
            raise ValueError("Quantidade insuficiente para saída.")

        nova_quantidade = equipamento['quantidade'] + quantidade if tipo == "entrada" else equipamento['quantidade'] - quantidade

        cursor_update = self.conn.cursor()
        cursor_insert = self.conn.cursor()
        try:
            cursor_update.execute(
                "UPDATE inventario SET quantidade = %s WHERE material = %s",
                (nova_quantidade, nome_material)
            )
            horario = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            cursor_insert.execute(
                "INSERT INTO movimentos (material, tipo, quantidade, horario) VALUES (%s, %s, %s, %s)",
                (nome_material, tipo, quantidade, horario)
            )
            self.conn.commit()
        finally:
            cursor_update.close()
            cursor_insert.close()

    def mostrar_disponiveis(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT material, categoria, quantidade FROM inventario WHERE quantidade > 0")
            dados = cursor.fetchall()
            if not dados:
                print("Nenhum material disponível.")
                return
            print(tabulate(dados, headers=["Material", "Categoria", "Quantidade"], tablefmt="fancy_grid", stralign="center"))
        finally:
            cursor.close()

    def listar_movimentacoes(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT material, tipo, quantidade, horario FROM movimentos")
            dados = cursor.fetchall()
            if not dados:
                print("Nenhuma movimentação registrada.")
                return
            print(tabulate(dados, headers=["Material", "Tipo", "Quantidade", "Horário"], tablefmt="fancy_grid", stralign="center"))
        finally:
            cursor.close()

    def adicionar_equipamento(self, nome_material, quantidade, categoria=""):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT COUNT(*) FROM inventario WHERE material = %s", (nome_material,))
            if cursor.fetchone()[0] > 0:
                raise ValueError("Equipamento já existe.")
            cursor.execute(
                "INSERT INTO inventario (material, categoria, quantidade) VALUES (%s, %s, %s)",
                (nome_material, categoria, quantidade)
            )
            self.conn.commit()
        finally:
            cursor.close()

    def remover_equipamento(self, nome_material):
        cursor = self.conn.cursor()
        try:
            cursor.execute("DELETE FROM inventario WHERE material = %s", (nome_material,))
            self.conn.commit()
        finally:
            cursor.close()

    def buscar_equipamento(self, nome_material):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT material, quantidade FROM inventario WHERE material = %s", (nome_material,))
            row = cursor.fetchone()
            return {"nome": row[0], "quantidade": row[1]} if row else None
        finally:
            cursor.fetchall()  # garante leitura de resultados pendentes
            cursor.close()

    def listar_equipamentos(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT material, categoria, quantidade FROM inventario")
            return cursor.fetchall()
        finally:
            cursor.close()

    def listar_por_categoria(self, nome_categoria):
        cursor = self.conn.cursor()
        try:
            cursor.execute(
                "SELECT material, quantidade FROM inventario WHERE categoria = %s AND quantidade > 0",
                (nome_categoria,)
            )
            return cursor.fetchall()
        finally:
            cursor.close()

    def listar_categorias(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT DISTINCT categoria FROM inventario")
            return [row[0] for row in cursor.fetchall()]
        finally:
            cursor.close()

    def limpar_estoque(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("DELETE FROM inventario")
            cursor.execute("DELETE FROM movimentos")
            self.conn.commit()
        finally:
            cursor.close()

    def verificar_estoque(self, nome_material):
        equipamento = self.buscar_equipamento(nome_material)
        return equipamento and equipamento['quantidade'] > 0

    def calcular_total_estoque(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT SUM(quantidade) FROM inventario")
            total = cursor.fetchone()[0]
            return total or 0
        finally:
            cursor.close()

    def calcular_total_movimentos(self):
        cursor = self.conn.cursor()
        try:
            cursor.execute("SELECT COUNT(*) FROM movimentos")
            total = cursor.fetchone()[0]
            return total or 0
        finally:
            cursor.close()

    def __del__(self):
        if self.conn.is_connected():
            self.conn.close()
