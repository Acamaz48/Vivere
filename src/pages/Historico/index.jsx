import BarraLateral from "../../components/BarraLateral";
import * as Z from "./styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchHistorico() {
      try {
        const resp = await fetch("http://localhost:3001/historico");
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        } 
        const data = await resp.json();
        const arr = Array.isArray(data) ? data : [];

        const normalizado = arr.map((raw) => ({
          id: raw.id ?? raw.ID ?? raw.id_historico ?? raw.idHistorico ?? null,
          nome_evento: raw.nome_evento ?? "",
          numero_os: raw.numero_os ?? "",
          responsavel: raw.responsavel ?? "" ,
          horario: raw.horario ?? raw.data_criacao ?? null,
          cliente_id: raw.cliente_id ?? "",
          tipo_evento: raw.tipo_evento ?? "",
          local_evento: raw.local_evento ?? "",
          data_inicio: raw.data_inicio ?? null,
          data_final: raw.data_final ?? null,
          data_montagem: raw.data_montagem ?? null,
          previsao_desmontagem: raw.previsao_desmontagem ?? null,
          contato_os: raw.contato_os ?? "",
          observacoes: raw.observacoes ?? "",
          materiais_selecionados: raw.materiais_selecionados ?? [],

        }));
        setHistorico(normalizado);
      } catch (e) {
        console.error("Falha ao buscar histórico:", e);
        setHistorico([]);
      }
    }
    fetchHistorico();
  }, []);

  
  const historicoFiltrado = Array.isArray(historico)
    ? historico.filter((item) => {
        const alvo = [item?.nome_evento, item?.numero_os, item?.responsavel]
          .filter(Boolean)
          .join(" ")
          .toLowerCase() || "";
        return alvo.includes(filtro.toLowerCase());
      })
    : [];

  const formatarData = (dataString) => {
    if (!dataString) return "Sem data";
    const d = new Date(dataString);
    if (isNaN(d.getTime())) return String(dataString);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation(); 
    if (!id) {
      toast.error("Este registro não possui ID para exclusão.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/historico/${id}`);
      setHistorico((prev) => prev.filter((item) => String(item.id) !== String(id)));
      toast.success("Excluído com sucesso!");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Erro ao excluir.";
      toast.error(msg);
    }
  };


  const handleToggleDetails = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Z.Tela>
      <BarraLateral />
      <Z.MainContent>
        <Z.Container>
          <Z.HeaderBar>
            <Z.Titulo>Histórico</Z.Titulo>
            <Z.FiltroGroup>
              <Z.Label>Buscar:</Z.Label>
              <Z.Input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </Z.FiltroGroup>
          </Z.HeaderBar>

          <Z.HistoricoList>
            {historicoFiltrado.map((item, index) => {
              const isExpanded = expandedId === item.id;

              return (
         
                <Z.ListItemWrapper key={item.id ?? index}>
            
                  <Z.ListItem onClick={() => handleToggleDetails(item.id)}>
                    <Z.ListItemTitle>
                      <strong>Evento: {item.nome_evento}</strong>
                      {item.numero_os && <span> • Número da OS: {item.numero_os}</span>}
                      {item.responsavel && <span> • Responsável: {item.responsavel}</span>}
                    </Z.ListItemTitle>

                    <div
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Z.ListItemTimestamp>{formatarData(item.horario)}</Z.ListItemTimestamp>

                      <FaTrash
                        onClick={(event) => handleDelete(item.id, event)}
                        style={{ cursor: "pointer", zIndex: 2 }}
                        title="Excluir"
                      />
                    </div>
                  </Z.ListItem>

                  {isExpanded && (
                    <Z.DetailsContent>
                      <h4>Detalhes do Registro</h4>
                      <p><strong>Evento:</strong> {item.nome_evento}</p>
                      <p><strong>Número da OS:</strong> {item.numero_os}</p>
                      <p><strong>Tipo de Evento:</strong> {item.tipo_evento}</p>
                      <p><strong>Local do Evento:</strong> {item.local_evento}</p>
                      <p><strong>Data de Início:</strong> {formatarData(item.data_inicio)}</p>
                      <p><strong>Data Final:</strong> {formatarData(item.data_final)}</p>
                      <p><strong>Data de Montagem:</strong> {formatarData(item.data_montagem)}</p>
                      <p><strong>Previsão de Desmontagem:</strong> {formatarData(item.previsao_desmontagem)}</p>
                      <p><strong>Contato da OS:</strong> {item.contato_os}</p>
                      <p><strong>Observações:</strong> {item.observacoes}</p>
                      <p><strong>Materiais Selecionados:</strong> {Array.isArray(item.materiais_selecionados) ? item.materiais_selecionados.join(", ") : item.materiais_selecionados}</p>
                      <p><strong>Responsável:</strong> {item.responsavel}</p>
                      
                    </Z.DetailsContent>
                  )}
                </Z.ListItemWrapper>
              );
            })}

            {historicoFiltrado.length === 0 && (
              <Z.EmptyState>Nenhum registro encontrado.</Z.EmptyState>
            )}
          </Z.HistoricoList>
        </Z.Container>
      </Z.MainContent>
    </Z.Tela>
  );
}