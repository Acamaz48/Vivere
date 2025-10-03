import { useEffect, useState } from "react";
import BarraLateral from "../../components/BarraLateral";
import axios from "axios";
import * as Z from "./styles";

export default function OrdemDeServico() {
  const [ordensDeServico, setOrdensDeServico] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const [modalOsAberto, setModalOsAberto] = useState(false);
  const [osSelecionada, setOsSelecionada] = useState(null);
  const [osDetalhada, setOsDetalhada] = useState({ linhas: [] });

  const [modalEventoAberto, setModalEventoAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const statusOrdem = ["analise", "reservado", "alocado", "finalizado", "cancelado"];

  useEffect(() => {
    async function carregarOrdens() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/ordens");
        setOrdensDeServico(response.data ?? []);
      } catch (error) {
        console.error("Erro ao carregar Ordens de Serviço:", error);
      }
    }
    carregarOrdens();
  }, []);

  useEffect(() => {
    async function carregarEventos() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/eventos");
        setEventos(response.data ?? []);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    }
    carregarEventos();
  }, []);

  const handleFinalizarOS = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/ordens/${id}/status`, { status: "finalizado" });
      setOrdensDeServico((prev) =>
        prev.map((os) => (os.id === id ? { ...os, status: "finalizado" } : os))
      );
    } catch (error) {
      console.error("Erro ao finalizar OS:", error);
    }
  };

  const handleAtualizarStatus = async (id, novoStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/ordens/${id}/status`, { status: novoStatus });
      setOrdensDeServico((prev) =>
        prev.map((os) => (os.id === id ? { ...os, status: novoStatus } : os))
      );
    } catch (error) {
      console.error("Erro ao atualizar status da OS:", error);
    }
  };

  const handleAbrirModalOS = async (os) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/ordens/${os.id}/linhas-detalhadas`);
      setOsDetalhada(response.data ?? { linhas: [] });
      setOsSelecionada(os);
      setModalOsAberto(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes da OS:", error);
    }
  };

  const handleFecharModalOS = () => {
    setModalOsAberto(false);
    setOsSelecionada(null);
    setOsDetalhada({ linhas: [] });
  };

  const handleAbrirModalEvento = async (evento) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/eventos/${evento.id}`);
      setEventoSelecionado(response.data ?? evento);
      setModalEventoAberto(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do evento:", error);
    }
  };

  const handleFecharModalEvento = () => {
    setModalEventoAberto(false);
    setEventoSelecionado(null);
  };

  const osFiltradas = ordensDeServico.filter(
    (os) =>
      os.nome_evento?.toLowerCase().includes(filtro.toLowerCase()) ||
      os.id?.toString().includes(filtro) ||
      os.status?.toLowerCase().includes(filtro.toLowerCase())
  );

  const osPorStatus = osFiltradas.reduce((acc, os) => {
    const status = os.status ?? "sem status";
    if (!acc[status]) acc[status] = [];
    acc[status].push(os);
    return acc;
  }, {});

  return (
    <Z.Tela>
      <BarraLateral />
      <Z.MainContent>
        <Z.Container>
          <Z.Titulo>Ordens de Serviço</Z.Titulo>

          <Z.FiltroGroup>
            <Z.Label>Filtrar por evento, OS ou status:</Z.Label>
            <Z.Input
              type="text"
              value={filtro}
              placeholder="Ex: Show da banda, OS-1, analise..."
              onChange={(e) => setFiltro(e.target.value)}
            />
          </Z.FiltroGroup>

          {statusOrdem.map((status) => {
            const osDoStatus = osPorStatus[status] ?? [];
            if (!osDoStatus.length) return null;
            return (
              <Z.Sessao key={status}>
                <Z.TituloSessao>{status.charAt(0).toUpperCase() + status.slice(1)}</Z.TituloSessao>
                <Z.CardContainer>
                  {osDoStatus.map((os) => (
                    <Z.Card key={os.id} onClick={() => handleAbrirModalOS(os)}>
                      <Z.CardHeader>
                        <Z.CardTitulo>OS - {os.id}</Z.CardTitulo>
                        <Z.CardSubtitulo>Evento: {os.nome_evento ?? "Não informado"}</Z.CardSubtitulo>
                      </Z.CardHeader>

                      <Z.CardInfo>
                        <Z.CardLabel>Status:</Z.CardLabel>
                        <Z.CardTexto>{os.status ?? "Não informado"}</Z.CardTexto>
                      </Z.CardInfo>

                      <Z.CardInfo>
                        <Z.CardLabel>Montagem:</Z.CardLabel>
                        <Z.CardTexto>{os.data_montagem ?? "Não informado"}</Z.CardTexto>
                      </Z.CardInfo>

                      <Z.CardInfo>
                        <Z.CardLabel>Contato:</Z.CardLabel>
                        <Z.CardTexto>{os.contato ?? "Não informado"}</Z.CardTexto>
                      </Z.CardInfo>

                      <Z.CardAcoes>
                        <Z.DropdownStatus
                          value={os.status ?? ""}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleAtualizarStatus(os.id, e.target.value)}
                        >
                          {statusOrdem.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </Z.DropdownStatus>

                        {os.status !== "finalizado" && (
                          <Z.BotaoFinalizar
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFinalizarOS(os.id);
                            }}
                          >
                            Finalizar
                          </Z.BotaoFinalizar>
                        )}
                      </Z.CardAcoes>
                    </Z.Card>
                  ))}
                </Z.CardContainer>
              </Z.Sessao>
            );
          })}

          <Z.TituloSessao style={{ marginTop: "40px" }}>Eventos</Z.TituloSessao>
          <Z.CardContainer>
            {eventos.map((evento) => (
              <Z.Card key={evento.id} onClick={() => handleAbrirModalEvento(evento)}>
                <Z.CardHeader>
                  <Z.CardTitulo>{evento.nome}</Z.CardTitulo>
                  <Z.CardSubtitulo>{evento.local}</Z.CardSubtitulo>
                </Z.CardHeader>
                <Z.CardInfo>
                  <Z.CardLabel>Data:</Z.CardLabel>
                  <Z.CardTexto>
                    {evento.data_inicio} {evento.data_fim ? `- ${evento.data_fim}` : ""}
                  </Z.CardTexto>
                </Z.CardInfo>
              </Z.Card>
            ))}
          </Z.CardContainer>
        </Z.Container>
      </Z.MainContent>

      {/* --- Modal OS --- */}
      {modalOsAberto && osSelecionada && (
        <Z.ModalOverlay onClick={handleFecharModalOS}>
          <Z.ModalContent onClick={(e) => e.stopPropagation()}>
            <Z.ModalCloseButton onClick={handleFecharModalOS}>&times;</Z.ModalCloseButton>

            <Z.ModalTitulo>Ordem de Serviço #{osSelecionada.id}</Z.ModalTitulo>
            <Z.ModalSubtitulo>Evento: {osSelecionada.nome_evento ?? "Não informado"}</Z.ModalSubtitulo>

            <Z.ModalInfo><strong>Status:</strong> {osSelecionada.status ?? "Não informado"}</Z.ModalInfo>
            <Z.ModalInfo><strong>Montagem:</strong> {osSelecionada.data_montagem ?? "Não informada"}</Z.ModalInfo>
            <Z.ModalInfo><strong>Entrega/Montagem:</strong> {osSelecionada.data_entrega_montagem ?? "Não informada"}</Z.ModalInfo>
            <Z.ModalInfo><strong>Desmontagem:</strong> {osSelecionada.data_desmontagem ?? "Não informada"}</Z.ModalInfo>
            <Z.ModalInfo><strong>Contato:</strong> {osSelecionada.contato ?? "Não informado"}</Z.ModalInfo>

            <Z.ModalSecaoTitulo>Itens da OS</Z.ModalSecaoTitulo>
            {osDetalhada.linhas.length > 0 ? (
              <Z.ModalTable>
                <thead>
                  <tr>
                    <Z.ModalTableHeader>Tipo</Z.ModalTableHeader>
                    <Z.ModalTableHeader>Nome</Z.ModalTableHeader>
                    <Z.ModalTableHeader>Quantidade</Z.ModalTableHeader>
                  </tr>
                </thead>
                <tbody>
                  {osDetalhada.linhas.map((linha) => (
                    <Z.ModalTableRow key={linha.id_item ?? linha.id_estrutura ?? Math.random()}>
                      <Z.ModalTableCell>{linha.tipo}</Z.ModalTableCell>
                      <Z.ModalTableCell>
                        {linha.tipo === "ITEM" ? linha.nome_item : linha.nome_estrutura}
                        {linha.tipo === "ESTRUTURA" && linha.componentes?.length > 0 && (
                          <ul style={{ paddingLeft: "20px", marginTop: "5px", listStyleType: "disc" }}>
                            {linha.componentes.map((comp) => (
                              <li key={comp.id_item}>
                                <Z.ModalItemTexto>{comp.nome_item}</Z.ModalItemTexto> - <Z.ModalItemQuantidade>Qtd. Final: {comp.quantidade_final}</Z.ModalItemQuantidade>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Z.ModalTableCell>
                      <Z.ModalTableCell>{linha.quantidade}</Z.ModalTableCell>
                    </Z.ModalTableRow>
                  ))}
                </tbody>
              </Z.ModalTable>
            ) : (
              <p>Nenhum item alocado.</p>
            )}
          </Z.ModalContent>
        </Z.ModalOverlay>
      )}

      {/* --- Modal Evento --- */}
      {modalEventoAberto && eventoSelecionado && (
        <Z.ModalOverlay onClick={handleFecharModalEvento}>
          <Z.ModalContent onClick={(e) => e.stopPropagation()}>
            <Z.ModalCloseButton onClick={handleFecharModalEvento}>&times;</Z.ModalCloseButton>

            <Z.ModalTitulo>{eventoSelecionado.nome}</Z.ModalTitulo>
            <Z.ModalInfo><strong>Local:</strong> {eventoSelecionado.local ?? "Não informado"}</Z.ModalInfo>
            <Z.ModalInfo>
              <strong>Data:</strong> {eventoSelecionado.data_inicio ?? "-"} {eventoSelecionado.data_fim ? `até ${eventoSelecionado.data_fim}` : ""}
            </Z.ModalInfo>
            <Z.ModalInfo><strong>Solicitante:</strong> {eventoSelecionado.solicitante ?? "Não informado"}</Z.ModalInfo>
            <Z.ModalInfo><strong>Responsável:</strong> {eventoSelecionado.responsavel ?? "Não informado"}</Z.ModalInfo>

            <Z.ModalSecaoTitulo>Materiais selecionados</Z.ModalSecaoTitulo>
            {eventoSelecionado.materiais?.length > 0 ? (
              <ul>
                {eventoSelecionado.materiais.map((mat) => (
                  <Z.ModalItem key={mat.id}>
                    <Z.ModalItemTexto>{mat.nome}</Z.ModalItemTexto> - <Z.ModalItemQuantidade>Qtd: {mat.quantidade}</Z.ModalItemQuantidade>
                  </Z.ModalItem>
                ))}
              </ul>
            ) : (
              <p>Nenhum material selecionado.</p>
            )}

            <Z.ModalSecaoTitulo>Ordens de Serviço vinculadas</Z.ModalSecaoTitulo>
            {eventoSelecionado.ordens?.length > 0 ? (
              <ul>
                {eventoSelecionado.ordens.map((os) => (
                  <li key={os.id} style={{ marginBottom: "5px" }}>
                    OS #{os.id} - Status: {os.status ?? "Não informado"}{" "}
                    <Z.BotaoAcao
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAbrirModalOS(os);
                        handleFecharModalEvento();
                      }}
                    >
                      Ver detalhes
                    </Z.BotaoAcao>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma OS vinculada.</p>
            )}
          </Z.ModalContent>
        </Z.ModalOverlay>
      )}
    </Z.Tela>
  );
}
