import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Estoque estoque = new Estoque();
        EstoqueService service = new EstoqueService(estoque);

        // Cadastro inicial de equipamentos fixos
        estoque.adicionarEquipamento(new Equipamentos(1, "Notebook Dell", "Informática", "Notebook de uso geral", 10, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(2, "Projetor Epson", "Audiovisual", "Projetor para apresentações", 5, "unidade"));

        // 10 equipamentos típicos de produção de eventos
        estoque.adicionarEquipamento(new Equipamentos(3, "Caixa de Som JBL", "Áudio", "Caixa ativa 500W", 15, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(4, "Microfone Sem Fio", "Áudio", "Microfone VHF", 20, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(5, "Mesa de Som", "Áudio", "Mesa 12 canais com efeitos", 4, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(6, "Iluminação LED RGB", "Luz", "Refletor de palco", 30, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(7, "Estrutura de Alumínio", "Palco", "Treliça para iluminação", 10, "metros"));
        estoque.adicionarEquipamento(new Equipamentos(8, "Gerador de Energia", "Energia", "Gerador 10kVA", 2, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(9, "Cabos XLR", "Áudio", "Cabos de áudio balanceado", 50, "metros"));
        estoque.adicionarEquipamento(new Equipamentos(10, "Telão de LED", "Vídeo", "Painel de LED P5", 2, "painel"));
        estoque.adicionarEquipamento(new Equipamentos(11, "Notebook Técnico", "TI", "Controle de som/LED", 3, "unidade"));
        estoque.adicionarEquipamento(new Equipamentos(12, "Base de Microfone", "Acessórios", "Suporte ajustável", 12, "unidade"));

        // Simulação de movimentações
        service.registrarEntrada(1, 3);
        service.registrarSaida(2, 1);

        // Relatórios
        service.mostrarRelatorioEstoque();
        service.mostrarMovimentacoes();

        Scanner scanner = new Scanner(System.in);

        // Entrada manual
        System.out.print("\nDigite o ID do equipamento para nova ENTRADA: ");
        int idEntrada = scanner.nextInt();
        System.out.print("Quantidade: ");
        int qtdEntrada = scanner.nextInt();
        service.registrarEntrada(idEntrada, qtdEntrada);

        // Saída manual
        System.out.print("\nDigite o ID do equipamento para nova SAÍDA: ");
        int idSaida = scanner.nextInt();
        System.out.print("Quantidade: ");
        int qtdSaida = scanner.nextInt();
        service.registrarSaida(idSaida, qtdSaida);

        // Buscar por nome
        scanner.nextLine(); // limpar buffer
        System.out.print("\nDigite o NOME do equipamento para buscar: ");
        String nomeBusca = scanner.nextLine();
        service.buscarPorNome(nomeBusca);

        // Remover
        System.out.print("\nDigite o ID do equipamento para REMOVER: ");
        int idRemover = scanner.nextInt();
        service.removerEquipamento(idRemover);

        // Equipamentos com estoque disponível
        service.listarComEstoque();

        scanner.close();
    }
}
