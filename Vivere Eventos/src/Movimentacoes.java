import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Movimentacoes {
    private String tipo; // entrada ou saída
    private Equipamentos equipamento;
    private int quantidade;
    private LocalDateTime horario;

    public Movimentacoes(String tipo, Equipamentos equipamento, int quantidade) {
        this.tipo = tipo;
        this.equipamento = equipamento;
        this.quantidade = quantidade;
        this.horario = LocalDateTime.now();
    }

    // Getters e Setters
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Equipamentos getEquipamento() {
        return equipamento;
    }
    public void setEquipamento(Equipamentos equipamento) {
        this.equipamento = equipamento;
    }

    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public LocalDateTime getHorario() {
        return horario;
    }
    public void setHorario(LocalDateTime horario) {
        this.horario = horario;
    }

    @Override
    public String toString() {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return "[" + horario.format(formato) + "] "
             + tipo + " de " + quantidade + "x "
             + equipamento.getNome() + " (ID: " + equipamento.getId() + ")";
    }
}
