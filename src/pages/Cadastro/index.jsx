import { useState, useEffect } from "react";
import axios from "axios";
import BarraLateral from "../../components/BarraLateral";
import * as Z from "./styles";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    cliente: "",
    nome_evento: "",
    tipo_evento: "",
    local_evento: "",
    data_inicio: "",
    data_final: "",
    data_montagem: "",
    previsao_desmontagem: "",
    responsavel: "",
    contato_os: "",
    observacoes: "",
    materiais_selecionados: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [itens, setItens] = useState([]);
  const [estruturas, setEstruturas] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMaterial = async () => {
    if (!selectedMaterial) return;

    const [tipo, idString] = selectedMaterial.split("-");
    const id = parseInt(idString, 10);

    let newMaterials = [...formData.materiais_selecionados];

    const isAlreadySelected = newMaterials.some(
      (mat) => mat.id === id && mat.tipo === tipo
    );
    if (isAlreadySelected) {
      alert("Este material ou estrutura já foi adicionado.");
      return;
    }

    if (tipo === "ITEM") {
      const materialData = itens.find((item) => item.id_item === id);
      if (materialData) {
        newMaterials.push({
          tipo: "ITEM",
          id: materialData.id_item,
          nome: materialData.material,
          categoria: materialData.categoria,
          quantidade: 1,
        });
      }
    } else if (tipo === "ESTRUTURA") {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/estruturas/${id}`);
        const estruturaDetalhes = response.data;

        const componentesComOriginal = estruturaDetalhes.componentes.map((comp) => ({
          ...comp,
          quantidade_original: comp.quantidade,
        }));

        newMaterials.push({
          tipo: "ESTRUTURA",
          id: estruturaDetalhes.id,
          nome: estruturaDetalhes.nome,
          quantidade: 1,
          componentes: componentesComOriginal,
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes da estrutura:", error);
        alert("Erro ao adicionar a estrutura.");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      materiais_selecionados: newMaterials,
    }));
  };

  useEffect(() => {
    async function fetchMaterials() {
      const API_URL = "http://127.0.0.1:5000";
      try {
        const estoqueResponse = await axios.get(`${API_URL}/api/inventario`);
        const inventario = estoqueResponse.data;
        const itensPlano = [];

        for (const categoria in inventario) {
          const categoriaObj = inventario[categoria];
          Object.values(categoriaObj).forEach((item) => {
            itensPlano.push({
              id_item: item.id_item,
              material: item.material,
              quantidade: 1,
              categoria: item.categoria,
            });
          });
        }
        setItens(itensPlano);

        const estruturasResponse = await axios.get(`${API_URL}/estruturas`);
        setEstruturas(estruturasResponse.data);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      }
    }
    fetchMaterials();
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const newMaterials = [...formData.materiais_selecionados];
    const material = newMaterials[index];
    const quantidade = parseInt(newQuantity);

    if (isNaN(quantidade) || quantidade < 1) {
      alert("A quantidade deve ser um número válido maior que 0.");
      return;
    }

    newMaterials[index].quantidade = quantidade;

    if (material.tipo === "ESTRUTURA" && material.componentes) {
      newMaterials[index].componentes = material.componentes.map((comp) => ({
        ...comp,
        quantidade: comp.quantidade_original * quantidade,
      }));
    }

    setFormData((prev) => ({ ...prev, materiais_selecionados: newMaterials }));
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = formData.materiais_selecionados.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, materiais_selecionados: newMaterials }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const montagem = new Date(formData.data_montagem);
    const desmontagem = new Date(formData.previsao_desmontagem);
    const inicioEvento = new Date(formData.data_inicio);

    if (desmontagem <= montagem) {
      setError("A data de desmontagem deve ser posterior à data de montagem.");
      return;
    }

    if (montagem < inicioEvento) {
      setError("A data de montagem não pode ser anterior ao início do evento.");
      return;
    }

    setConfirmationData({ ...formData });
    setShowConfirmation(true);
  }

  const handleConfirmSubmission = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const API_URL = "http://127.0.0.1:5000";

    try {
      // Criar evento
      const eventPayload = {
        nome: confirmationData.nome_evento,
        local: confirmationData.local_evento,
        data_evento: confirmationData.data_inicio,
        solicitante: confirmationData.cliente,
        responsavel: confirmationData.responsavel,
      };
      const eventResponse = await axios.post(`${API_URL}/api/eventos`, eventPayload);
      const newEventId = eventResponse.data.id;

      // Criar OS
      const osPayload = {
        id_evento: newEventId,
        id_responsavel: 1,
        status: "reservado",
        data_montagem: confirmationData.data_montagem,
        data_desmontagem: confirmationData.previsao_desmontagem,
        contato: confirmationData.contato_os,
      };
      const osResponse = await axios.post(`${API_URL}/api/ordens`, osPayload);
      const newOsId = osResponse.data.ordem_id;

      // Adicionar materiais
      for (const material of confirmationData.materiais_selecionados) {
        const linhaPayload = {
          tipo: material.tipo,
          id_item: material.tipo === "ITEM" ? material.id : null,
          id_estrutura: material.tipo === "ESTRUTURA" ? material.id : null,
          quantidade: material.quantidade,
        };
        await axios.post(`${API_URL}/api/ordens/${newOsId}/linhas`, linhaPayload);
      }

      setSuccessMessage(`Evento e Ordem de Serviço criados com sucesso! OS ID: ${newOsId}`);
      setShowConfirmation(false);
      setFormData({
        cliente: "",
        nome_evento: "",
        tipo_evento: "",
        local_evento: "",
        data_inicio: "",
        data_final: "",
        data_montagem: "",
        previsao_desmontagem: "",
        responsavel: "",
        contato_os: "",
        observacoes: "",
        materiais_selecionados: [],
      });
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err.response ? err.response.data : err.message);
      setError("Erro ao criar a Ordem de Serviço. Verifique os dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Z.Main>
      <BarraLateral />
      <Z.FormContainer>
        <Z.Titulo>Cadastro</Z.Titulo>
        <Z.Form onSubmit={handleSubmit}>
          <Z.FormGroup>
            <label>Número da OS:</label>
            <input type="text" required name="numero_os" value={formData.numero_os || ""} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Clientes:</label>
            <select name="cliente" required value={formData.cliente} onChange={handleChange}>
              <option value="">- - - - -</option>
              <option value="1">Cliente 1</option>
              <option value="2">Cliente 2</option>
              <option value="3">Cliente 3</option>
            </select>
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Nome do Evento:</label>
            <input type="text" required name="nome_evento" value={formData.nome_evento} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Tipo do Evento:</label>
            <input type="text" required name="tipo_evento" value={formData.tipo_evento} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup $full>
            <label>Local do Evento:</label>
            <input type="text" required name="local_evento" value={formData.local_evento} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Data de Início do Evento:</label>
            <input type="date" required name="data_inicio" value={formData.data_inicio} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Data do Final do Evento:</label>
            <input type="date" required name="data_final" value={formData.data_final} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Data de Montagem:</label>
            <input type="date" required name="data_montagem" value={formData.data_montagem} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Previsão de Desmontagem:</label>
            <input type="date" required name="previsao_desmontagem" value={formData.previsao_desmontagem} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Responsável:</label>
            <input type="text" required name="responsavel" value={formData.responsavel} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Contato OS:</label>
            <input type="text" required name="contato_os" value={formData.contato_os} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup $full>
            <label>Observações:</label>
            <textarea rows="6" name="observacoes" value={formData.observacoes} onChange={handleChange} />
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Seleção de Materiais:</label>
            <select name="materiais" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
              <option value="">Selecione um material</option>
              <optgroup label="Itens">
                {itens.map((item) => (
                  <option key={`item-${item.id_item}`} value={`ITEM-${item.id_item}`}>
                    {item.categoria} {item.material} (Disponível: {item.quantidade})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Estruturas">
                {estruturas.map((estrutura) => (
                  <option key={`estrutura-${estrutura.id}`} value={`ESTRUTURA-${estrutura.id}`}>
                    {estrutura.nome}
                  </option>
                ))}
              </optgroup>
            </select>
            <button type="button" onClick={handleAddMaterial}>Adicionar</button>
          </Z.FormGroup>

          <Z.FormGroup>
            <label>Materiais Selecionados:</label>
            {formData.materiais_selecionados.length === 0 ? (
              <p>Nenhum material selecionado.</p>
            ) : (
              <Z.SelectedMaterialsList>
                {formData.materiais_selecionados.map((material, index) => (
                  <div key={`${material.tipo}-${material.id}`}>
                    <Z.MaterialItem>
                      <span>{material.nome}</span>
                      <input type="number" min="1" value={material.quantidade} onChange={(e) => handleQuantityChange(index, e.target.value)} style={{ width: '60px' }} />
                      <button type="button" onClick={() => handleRemoveMaterial(index)}>Remover</button>
                    </Z.MaterialItem>
                    {material.tipo === "ESTRUTURA" && material.componentes && (
                      <ul style={{ marginLeft: '20px', fontSize: '0.9em' }}>
                        {material.componentes.map((comp) => (
                          <li key={comp.id_item}>{comp.nome}: {comp.quantidade} un.</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Z.SelectedMaterialsList>
            )}
          </Z.FormGroup>

          <Z.Botao type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Z.Botao>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>}
        </Z.Form>
      </Z.FormContainer>

      {showConfirmation && confirmationData && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
            maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>Confirmação da Ordem de Serviço</h2>
            <h3>Detalhes do Evento</h3>
            <ul>
              <li><strong>Cliente:</strong> {confirmationData.cliente}</li>
              <li><strong>Nome do Evento:</strong> {confirmationData.nome_evento}</li>
              <li><strong>Local:</strong> {confirmationData.local_evento}</li>
              <li><strong>Data Início:</strong> {confirmationData.data_inicio}</li>
              <li><strong>Data Final:</strong> {confirmationData.data_final}</li>
            </ul>
            <h3>Detalhes da Ordem de Serviço</h3>
            <ul>
              <li><strong>Responsável:</strong> {confirmationData.responsavel}</li>
              <li><strong>Contato da OS:</strong> {confirmationData.contato_os}</li>
              <li><strong>Data de Montagem:</strong> {confirmationData.data_montagem}</li>
              <li><strong>Previsão de Desmontagem:</strong> {confirmationData.previsao_desmontagem}</li>
            </ul>
            {confirmationData.observacoes && (
              <div>
                <h3>Observações</h3>
                <p>{confirmationData.observacoes}</p>
              </div>
            )}
            <h3>Materiais Selecionados</h3>
            <ul>
              {confirmationData.materiais_selecionados.map((material, index) => (
                <li key={index}>
                  <strong>{material.nome}</strong> - Quantidade: {material.quantidade}
                  {material.tipo === "ESTRUTURA" && (
                    <ul style={{ marginLeft: '20px', fontSize: '0.9em' }}>
                      {material.componentes.map((comp) => (
                        <li key={comp.id_item}>{comp.nome}: {comp.quantidade} un.</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
              <button onClick={handleConfirmSubmission} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Z.Main>
  );
}
