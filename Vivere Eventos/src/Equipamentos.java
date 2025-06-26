public class Equipamentos {
    private int id;
    private String nome;
    private String tipo;
    private String descricao;
    private int quantidadeDisponivel;
    private String medida;

    // Construtor completo
    public Equipamentos(int id, String nome, String tipo, String descricao, int quantidadeDisponivel, String medida) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.medida = medida;
    }

    // Getters e Setters padrão
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public int getQuantidadeDisponivel() { return quantidadeDisponivel; }
    public void setQuantidadeDisponivel(int quantidadeDisponivel) { this.quantidadeDisponivel = quantidadeDisponivel; }

    public String getMedida() { return medida; }
    public void setMedida(String medida) { this.medida = medida; }

    @Override
    public String toString() {
        return "Equipamento{" +
            "id=" + id +
            ", nome='" + nome + '\'' +
            ", tipo='" + tipo + '\'' +
            ", descricao='" + descricao + '\'' +
            ", quantidadeDisponivel=" + quantidadeDisponivel +
            ", medida='" + medida + '\'' +
            '}';
    }
}
