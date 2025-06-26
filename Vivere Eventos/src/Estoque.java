import java.util.ArrayList;
import java.util.List;

public class Estoque {
    private List<Equipamentos> equipamentos = new ArrayList<>();
    private List<Movimentacoes> movimentacoes = new ArrayList<>();

    // Adiciona equipamento novo ao estoque
    public void adicionarEquipamento(Equipamentos equipamento) {
        equipamentos.add(equipamento);
    }

    // Buscar equipamento por ID
    public Equipamentos buscarEquipamentoPorId(int id) {
        for (Equipamentos eq : equipamentos) {
            if (eq.getId() == id) {
                return eq;
            }
        }
        return null;
    }

    // Entrada no estoque
    public void registrarEntrada(int idEquipamento, int quantidade) {
        Equipamentos eq = buscarEquipamentoPorId(idEquipamento);
        if (eq != null) {
            eq.setQuantidadeDisponivel(eq.getQuantidadeDisponivel() + quantidade);
            movimentacoes.add(new Movimentacoes("ENTRADA", eq, quantidade));
        } else {
            System.out.println("Equipamento com ID " + idEquipamento + " não encontrado.");
        }
    }

    // Saída do estoque
    public void registrarSaida(int idEquipamento, int quantidade) {
        Equipamentos eq = buscarEquipamentoPorId(idEquipamento);
        if (eq != null) {
            if (eq.getQuantidadeDisponivel() >= quantidade) {
                eq.setQuantidadeDisponivel(eq.getQuantidadeDisponivel() - quantidade);
                movimentacoes.add(new Movimentacoes("SAÍDA", eq, quantidade));
            } else {
                System.out.println("Quantidade insuficiente no estoque.");
            }
        } else {
            System.out.println("Equipamento com ID " + idEquipamento + " não encontrado.");
        }
    }

    // Lista equipamentos com estoque atual
    public void listarEstoque() {
        for (Equipamentos eq : equipamentos) {
            System.out.println(eq);
        }
    }

    // Lista todas as movimentações
    public void listarMovimentacoes() {
        for (Movimentacoes mov : movimentacoes) {
            System.out.println(mov);
        }
    }
    // Remover equipamento por ID
public void removerEquipamento(int id) {
    Equipamentos eq = buscarEquipamentoPorId(id);
    if (eq != null) {
        equipamentos.remove(eq);
        System.out.println("Equipamento com ID " + id + " removido.");
    } else {
        System.out.println("Equipamento com ID " + id + " não encontrado.");
    }
}

// Buscar equipamento por nome (ignora maiúsculas/minúsculas)
public Equipamentos buscarEquipamentoPorNome(String nome) {
    for (Equipamentos eq : equipamentos) {
        if (eq.getNome().equalsIgnoreCase(nome)) {
            return eq;
        }
    }
    return null;
}

// Listar apenas os que têm estoque
public void listarEquipamentosComEstoque() {
    for (Equipamentos eq : equipamentos) {
        if (eq.getQuantidadeDisponivel() > 0) {
            System.out.println(eq);
        }
    }
}











}
