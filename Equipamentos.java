puclic class Equipamento {
    pivate int id;
    private String nome;
    private String tipo;
    private String descricao;
    private int quantidadeDisponivel;
    private String medida;

    public Equipamento(int id, string nome, string tipo, string descricao, int quantidadeDisponivel, string medida){
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.quantidadeDisponivel  = quantidade Disponivel;
        this.medida = medida;
    }

    public int getid() {return id; }
    public void setid(int id) {this.id = id; }

    public String nome() {return nome; }
    public void setnome(String nome) {this.nome = nome; }

    public String tipo() {return tipo; }
    public void settipo(String tipo) {this.tipo = tipo; }

    public String descricao() {return descricao; }
    public void setdescricao(String descricao) {this.descricao = descricao; }

    public int getQuantidadeDisponivel() { return quantidadeDisponivel; }
    public void setQuantidadeDisponivel(int quantidadeDisponivel) { this.quantidadeDisponivel = quantidadeDisponivel; }

    public String medida() {return medida; }
    public void setmedida(String medida) {this.medida = medida; }

    

    @Override

    public String toString (){
        return "Equipamento{"
            "id=" + id +
            ", nome='" + nome + '\'' +
            ", tipo='" + tipo + '\'' +
            ", descricao='" + descricao + '\'' +
            ", quantidadeDisponivel=" + quantidadeDisponivel + '\'' +
            ", medida='" + medida + '\'' +
            '}';
    }


}