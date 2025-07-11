from servicos.estoque import EstoqueService

def main():
    estoque = EstoqueService()

    while True:
        print("\n=== MENU ESTOQUE ===")
        print("1. Adicionar equipamento")
        print("2. Remover equipamento")
        print("3. Mostrar equipamentos disponíveis")
        print("4. Registrar movimento (entrada/saída)")
        print("5. Listar movimentações")
        print("6. Limpar estoque")
        print("7. Total de equipamentos")
        print("8. Total de movimentações")
        print("0. Sair")
        opcao = input("Escolha uma opção: ")

        try:
            if opcao == "1":
                nome = input("Nome do equipamento/material: ").strip()
                qtd = int(input("Quantidade inicial: "))
                estoque.adicionar_equipamento(nome, qtd)
                print("Equipamento adicionado com sucesso!")

            elif opcao == "2":
                nome = input("Nome do equipamento/material a remover: ").strip()
                estoque.remover_equipamento(nome)
                print("Equipamento removido.")

            elif opcao == "3":
                print("\nEquipamentos disponíveis:")
                estoque.mostrar_disponiveis()

            elif opcao == "4":
                nome = input("Nome do equipamento/material: ").strip()
                tipo = input("Tipo (entrada/saida): ").strip().lower()
                if tipo not in ("entrada", "saida"):
                    print("Tipo inválido! Use 'entrada' ou 'saida'.")
                    continue
                qtd = int(input("Quantidade: "))
                estoque.registrar_movimento(nome, tipo, qtd)
                print("Movimento registrado!")

            elif opcao == "5":
                print("\nHistórico de movimentações:")
                estoque.listar_movimentacoes()

            elif opcao == "6":
                confirmar = input("Tem certeza que deseja limpar o estoque? (s/n): ")
                if confirmar.lower() == "s":
                    estoque.limpar_estoque()
                    print("Estoque limpo!")

            elif opcao == "7":
                total = estoque.calcular_total_estoque()
                print(f"Total de equipamentos no estoque: {total}")

            elif opcao == "8":
                total = estoque.calcular_total_movimentos()
                print(f"Total de movimentações registradas: {total}")

            elif opcao == "0":
                print("Saindo...")
                break

            else:
                print("Opção inválida. Tente novamente.")

        except Exception as e:
            print(f"Erro: {e}")

if __name__ == "__main__":
    main()
