class Equipamento:
    def __init__(self, id, nome, quantidade):
        self.id = id
        self.nome = nome
        self.quantidade = quantidade
    def __str__(self):
        return f"Equipamento(id={self.id}, nome='{self.nome}', quantidade={self.quantidade})"
    def __repr__(self):
        return self.__str__()
    def adicionar_quantidade(self, quantidade_adicional):
        if quantidade_adicional < 0:
            raise ValueError("A quantidade adicional não pode ser negativa.")
        self.quantidade += quantidade_adicional
        return self
    def remover_quantidade(self, quantidade_removida):
        if quantidade_removida < 0:
            raise ValueError("A quantidade removida não pode ser negativa.")
        if quantidade_removida > self.quantidade:
            raise ValueError("Não é possível remover mais do que a quantidade disponível.")
        self.quantidade -= quantidade_removida
        return self
    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "quantidade": self.quantidade
        }