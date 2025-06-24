import br.com.suaempresa.eventequipmentmanager.log.Movimentacoes;
import br.com.suaempresa.eventequipmentmanager.model.Equipamento;

import java.util.ArrayList;
import java.util.List;

public class Estoque {
    private List<Equipamento> equipamentos;

    public Estoque() {
        equipamentos = new ArrayList<>();
    }

    public void adicionarEquipamento(Equipamento equipamento) {
        equipamentos.add(equipamento);
        String msg = "[ENTRADA] " + equipamento.getNome() + " | Quantidade: " + equipamento.getQuantidadeDisponivel();
        System.out.println(msg);
        LogMovimentacoes.registrar(msg);
    }

    public boolean retirarEquipamento(int id, int quantidade) {
        for (Equipamento eq : equipamentos) {
            if (eq.getId() == id) {
                if (eq.getQuantidadeDisponivel() >= quantidade) {
                    eq.setQuantidadeDisponivel(eq.getQuantidadeDisponivel() - quantidade);
                    String msg = "[SAÍDA] Retirado " + quantidade + " de " + eq.getNome() + " | Restante: " + eq.getQuantidadeDisponivel();
                    System.out.println(msg);
                    LogMovimentacoes.registrar(msg);
                    return true;
                } else {
                    String msg = "[ERRO] Falta de estoque para " + eq.getNome() + " | Solicitado: " + quantidade + ", Disponível: " + eq.getQuantidadeDisponivel();
                    System.out.println(msg);
                    LogMovimentacoes.registrar(msg);
                    return false;
                }
            }
        }
        String msg = "[ERRO] Equipamento ID " + id + " não encontrado.";
        System.out.println(msg);
        LogMovimentacoes.registrar(msg);
        return false;
    }

    public void listarEquipamentos() {
        System.out.println("=== ESTOQUE ATUAL ===");
        for (Equipamento eq : equipamentos) {
            System.out.println(eq);
        }
    }
}
