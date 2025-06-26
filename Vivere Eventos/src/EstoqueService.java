public class EstoqueService {
    private Estoque estoque;

    public EstoqueService(Estoque estoque) {
        this.estoque = estoque;
    }

    public void registrarEntrada(int idEquipamento, int quantidade) {
        Equipamentos eq = estoque.buscarEquipamentoPorId(idEquipamento);
        if (eq != null) {
            estoque.registrarEntrada(idEquipamento, quantidade);
            System.out.println("Entrada registrada com sucesso.");
        } else {
            System.out.println("Equipamento com ID " + idEquipamento + " não encontrado.");
        }
    }

    public void registrarSaida(int idEquipamento, int quantidade) {
        Equipamentos eq = estoque.buscarEquipamentoPorId(idEquipamento);
        if (eq != null) {
            if (eq.getQuantidadeDisponivel() >= quantidade) {
                estoque.registrarSaida(idEquipamento, quantidade);
                System.out.println("Saída registrada com sucesso.");
            } else {
                System.out.println("Estoque insuficiente para esse equipamento.");
            }
        } else {
            System.out.println("Equipamento com ID " + idEquipamento + " não encontrado.");
        }
    }

    public void mostrarRelatorioEstoque() {
        System.out.println("==== ESTOQUE ATUAL ====");
        estoque.listarEstoque();
    }

    public void mostrarMovimentacoes() {
        System.out.println("==== MOVIMENTAÇÕES ====");
        estoque.listarMovimentacoes();
    }

    public void removerEquipamento(int idEquipamento) {
        estoque.removerEquipamento(idEquipamento);
    }

    public void buscarPorNome(String nome) {
        Equipamentos eq = estoque.buscarEquipamentoPorNome(nome);
        if (eq != null) {
            System.out.println("Equipamento encontrado: " + eq);
        } else {
            System.out.println("Nenhum equipamento com o nome \"" + nome + "\" foi encontrado.");
        }
    }

    public void listarComEstoque() {
        System.out.println("==== EQUIPAMENTOS COM ESTOQUE DISPONÍVEL ====");
        estoque.listarEquipamentosComEstoque();
    }
}
