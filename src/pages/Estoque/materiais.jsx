import { useEffect, useState } from "react";
import BarraLateral from "../../components/BarraLateral";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as Z from "./styles";

export default function Materiais() {
  const [materiais, setMateriais] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    carregarMateriais();
  }, []);

  const carregarMateriais = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/inventario");
      // Filtra apenas materiais (categoria diferente de "ESTRUTURA")
      const dados = response.data.filter(item => item.categoria.toUpperCase() !== "ESTRUTURA")
        .map(item => ({
          id: item.id,
          categoria: item.categoria || "",
          nome: item.material || "",
          codigo: item.codigo || "",
          unidade: item.unidade || "",
          quantidade: item.quantidade || 0
        }));
      setMateriais(dados);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
      toast.error("Erro ao carregar materiais.");
    }
  };

  // Filtro e paginação
  const dadosFiltrados = materiais.filter(item =>
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

  const handleExportarPDF = () => {
    if (materiais.length === 0) {
      toast.warn("Não há materiais para exportar.");
      return;
    }
    const doc = new jsPDF();
    doc.text("Relatório de Materiais", 14, 15);

    const tableColumns = ["Categoria", "Nome", "Código", "Unidade", "Quantidade"];
    const tableRows = materiais.map(item => [
      item.categoria, item.nome, item.codigo, item.unidade, item.quantidade
    ]);

    autoTable(doc, { head: [tableColumns], body: tableRows, startY: 20, headStyles: { fillColor: '#ED730B' }});
    doc.save("materiais.pdf");
    toast.success("PDF exportado!");
  };

  return (
    <Z.Tela>
      <BarraLateral />
      <Z.MainContent>
        <Z.Container>
          <Z.HeaderBar>
            <Z.Titulo>Materiais</Z.Titulo>
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

          <Z.TabelaContainer>
            <Z.Tabela>
              <thead>
                <Z.TabelaRow>
                  <Z.TabelaHeader>Categoria</Z.TabelaHeader>
                  <Z.TabelaHeader>Nome</Z.TabelaHeader>
                  <Z.TabelaHeader>Código</Z.TabelaHeader>
                  <Z.TabelaHeader>Unidade</Z.TabelaHeader>
                  <Z.TabelaHeader>Quantidade</Z.TabelaHeader>
                </Z.TabelaRow>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <Z.TabelaRow key={item.id}>
                    <Z.TabelaCell>{item.categoria}</Z.TabelaCell>
                    <Z.TabelaCell>{item.nome}</Z.TabelaCell>
                    <Z.TabelaCell>{item.codigo}</Z.TabelaCell>
                    <Z.TabelaCell>{item.unidade}</Z.TabelaCell>
                    <Z.TabelaCell>{item.quantidade}</Z.TabelaCell>
                  </Z.TabelaRow>
                ))}
              </tbody>
            </Z.Tabela>
          </Z.TabelaContainer>

          {totalPages > 1 && (
            <Z.PaginacaoContainer>
              <Z.ButtonPaginacao onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</Z.ButtonPaginacao>
              <span>Página {currentPage} de {totalPages}</span>
              <Z.ButtonPaginacao onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</Z.ButtonPaginacao>
            </Z.PaginacaoContainer>
          )}

          <Z.ButtonExportar onClick={handleExportarPDF}>
            Exportar PDF
          </Z.ButtonExportar>
        </Z.Container>
      </Z.MainContent>
    </Z.Tela>
  );
}
