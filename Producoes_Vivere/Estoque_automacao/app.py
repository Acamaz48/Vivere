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
                categoria = input("Categoria do equipamento: ").strip()
                estoque.adicionar_equipamento(nome, qtd, categoria)
                print("Equipamento adicionado com sucesso!")

            elif opcao == "2":
                nome = input("Nome do equipamento/material a remover: ").strip()
                estoque.remover_equipamento(nome)
                print("Equipamento removido.")

            elif opcao == "3":
                estoque.mostrar_disponiveis()

            elif opcao == "4":
                print("\n=== Registrar Movimento ===")
                categorias = estoque.listar_categorias()
                if not categorias:
                    print("Nenhuma categoria encontrada.")
                    continue

                print("\nCategorias disponíveis:")
                for i, cat in enumerate(categorias, 1):
                    print(f"{i}. {cat}")

                try:
                    indice_cat = int(input("\nEscolha o número da categoria: ")) - 1
                    nome_categoria = categorias[indice_cat]
                except (ValueError, IndexError):
                    print("Categoria inválida.")
                    continue

                materiais = estoque.listar_por_categoria(nome_categoria)
                if not materiais:
                    print(f"Nenhum material encontrado na categoria '{nome_categoria}'.")
                    continue

                print(f"\nMateriais da categoria '{nome_categoria}':")
                for i, (mat, qtd) in enumerate(materiais, 1):
                    print(f"{i}. {mat} - Quantidade: {qtd}")

                try:
                    indice = int(input("Escolha o número do material: ")) - 1
                    nome_material = materiais[indice][0]
                except (ValueError, IndexError):
                    print("Opção inválida.")
                    continue

                tipo = input("Tipo (entrada/saida): ").strip().lower()
                if tipo not in ("entrada", "saida"):
                    print("Tipo inválido! Use 'entrada' ou 'saida'.")
                    continue

                qtd = int(input("Quantidade: "))
                estoque.registrar_movimento(nome_material, tipo, qtd)
                print("Movimento registrado!")

            elif opcao == "5":
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
