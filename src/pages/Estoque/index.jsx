import { useEffect, useState } from "react";
import BarraLateral from "../../components/BarraLateral";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as Z from "./styles";

export default function EstoqueVisualizacao() {
  const [dadosEstoque, setDadosEstoque] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    categoria: "",
    nome: "",
    codigo: "",
    unidade_de_medida: "",
    quantidade: ""
  });

  useEffect(() => {
    carregarEstoque();
  }, []);

  // Carregar inventário
  const carregarEstoque = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/inventario");

      // Transformar lista do backend em dados do front
      const dados = response.data.map((item) => ({
        id: item.id,
        categoria: item.categoria || "",
        nome: item.material || "",
        codigo: item.codigo || "",
        unidade_de_medida: item.unidade_de_medida || "",
        disponiveis: item.quantidade || 0,
        reservados: 0,
        alocados: 0
      }));

      setDadosEstoque(dados);
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
      toast.error("Erro ao buscar dados do estoque.");
    }
  };

  // Formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setFormData({
        categoria: "",
        nome: "",
        codigo: "",
        unidade_de_medida: "",
        quantidade: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.post("http://127.0.0.1:5000/api/inventario", {
        categoria: formData.categoria,
        material: formData.nome,
        quantidade: parseInt(formData.quantidade)
      });

      toast.success("Item adicionado com sucesso!");
      setFormData({
        categoria: "",
        nome: "",
        codigo: "",
        unidade_de_medida: "",
        quantidade: ""
      });
      setIsFormVisible(false);
      carregarEstoque();
    } catch (error) {
      console.error("Erro ao salvar item:", error);
      toast.error("Erro ao salvar item no estoque.");
    } finally {
      setSaving(false);
    }
  };

  // Filtro e paginação
  const dadosFiltrados = dadosEstoque.filter((item) =>
    item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    item.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
    item.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPages = Math.ceil(dadosFiltrados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dadosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro]);

  // Exportar PDF
  const handleExportarPDF = () => {
    if (dadosEstoque.length === 0) {
      toast.warn("Não há dados para exportar.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Relatório de Estoque", 14, 15);

    const tableColumns = [
      "Categoria",
      "Nome",
      "Código",
      "Unidade",
      "Disponíveis",
      "Reservados",
      "Alocados"
    ];

    const tableRows = dadosEstoque.map(item => [
      item.categoria,
      item.nome,
      item.codigo,
      item.unidade_de_medida,
      item.disponiveis,
      item.reservados,
      item.alocados
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: '#ED730B' }
    });

    doc.save("relatorio_estoque.pdf");
    toast.success("Relatório PDF exportado!");
  };

  return (
    <Z.Tela>
      <BarraLateral />
      <Z.MainContent>
        <Z.Container>
          <Z.HeaderBar>
            <Z.Titulo>Estoque</Z.Titulo>
            <Z.ButtonAdicionar onClick={handleToggleForm} $secondary={isFormVisible}>
              {isFormVisible ? "Cancelar" : "Adicionar Novo Item"}
            </Z.ButtonAdicionar>
          </Z.HeaderBar>

          <Z.FiltroGroup>
            <Z.Label>Filtrar por nome, categoria ou código:</Z.Label>
            <Z.Input
              type="text"
              value={filtro}
              placeholder="Ex: Q30, Trelica, TRE-5m..."
              onChange={(e) => setFiltro(e.target.value)}
            />
          </Z.FiltroGroup>

          {isFormVisible && (
            <Z.FormContainer onSubmit={handleSubmit}>
              <Z.GridRow>
                <Z.InputBase>
                  <Z.Label>Categoria:</Z.Label>
                  <Z.Input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
                </Z.InputBase>
                <Z.InputBase>
                  <Z.Label>Nome:</Z.Label>
                  <Z.Input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                </Z.InputBase>
                <Z.InputBase>
                  <Z.Label>Código:</Z.Label>
                  <Z.Input type="text" name="codigo" value={formData.codigo} onChange={handleChange} />
                </Z.InputBase>
                <Z.InputBase>
                  <Z.Label>Unidade de Medida:</Z.Label>
                  <Z.Input type="text" name="unidade_de_medida" value={formData.unidade_de_medida} onChange={handleChange} />
                </Z.InputBase>
                <Z.InputBase>
                  <Z.Label>Quantidade:</Z.Label>
                  <Z.Input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} required min="0" />
                </Z.InputBase>
              </Z.GridRow>
              <Z.ButtonSalvar type="submit" disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Z.ButtonSalvar>
            </Z.FormContainer>
          )}

          <Z.TabelaContainer>
            <Z.Tabela>
              <thead>
                <Z.TabelaRow>
                  <Z.TabelaHeader>Categoria</Z.TabelaHeader>
                  <Z.TabelaHeader>Nome</Z.TabelaHeader>
                  <Z.TabelaHeader>Código</Z.TabelaHeader>
                  <Z.TabelaHeader>Unidade</Z.TabelaHeader>
                  <Z.TabelaHeader>Disponíveis</Z.TabelaHeader>
                  <Z.TabelaHeader>Reservados</Z.TabelaHeader>
                  <Z.TabelaHeader>Alocados</Z.TabelaHeader>
                </Z.TabelaRow>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <Z.TabelaRow key={item.id}>
                    <Z.TabelaCell>{item.categoria}</Z.TabelaCell>
                    <Z.TabelaCell>{item.nome}</Z.TabelaCell>
                    <Z.TabelaCell>{item.codigo}</Z.TabelaCell>
                    <Z.TabelaCell>{item.unidade_de_medida}</Z.TabelaCell>
                    <Z.TabelaCell>{item.disponiveis}</Z.TabelaCell>
                    <Z.TabelaCell>{item.reservados}</Z.TabelaCell>
                    <Z.TabelaCell>{item.alocados}</Z.TabelaCell>
                  </Z.TabelaRow>
                ))}
              </tbody>
            </Z.Tabela>
          </Z.TabelaContainer>

          {totalPages > 1 && (
            <Z.PaginacaoContainer>
              <Z.ButtonPaginacao onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </Z.ButtonPaginacao>
              <span>Página {currentPage} de {totalPages}</span>
              <Z.ButtonPaginacao onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Próxima
              </Z.ButtonPaginacao>
            </Z.PaginacaoContainer>
          )}

          <Z.ButtonExportar onClick={handleExportarPDF}>
            Exportar Relatório
          </Z.ButtonExportar>
        </Z.Container>
      </Z.MainContent>
    </Z.Tela>
  );
}
