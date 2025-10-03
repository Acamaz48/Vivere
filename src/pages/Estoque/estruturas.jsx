// src/pages/Estruturas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BarraLateral from "../../components/BarraLateral"; // verifique se o caminho está correto
import * as Z from "./styles"; // seus estilos

export default function Estruturas() {
  const [estruturas, setEstruturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Buscar estruturas no back-end
  const fetchEstruturas = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/api/estruturas");
      setEstruturas(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar estruturas:", err);
      setErro("Não foi possível carregar as estruturas.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstruturas();
  }, []);

  return (
    <Z.Container>
      <BarraLateral />
      <Z.MainContent>
        <h1>Estruturas</h1>

        {loading && <p>Carregando estruturas...</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {!loading && !erro && estruturas.length === 0 && <p>Nenhuma estrutura encontrada.</p>}

        {!loading && !erro && estruturas.length > 0 && (
          <Z.TabelaContainer>
            <Z.Tabela>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Item</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {estruturas.map((estrutura) => (
                  <Z.TabelaRow key={estrutura.id}>
                    <Z.TabelaCell>{estrutura.id}</Z.TabelaCell>
                    <Z.TabelaCell>{estrutura.nome}</Z.TabelaCell>
                    <Z.TabelaCell>{estrutura.tipo}</Z.TabelaCell>
                    <Z.TabelaCell>{estrutura.item}</Z.TabelaCell>
                    <Z.TabelaCell>{estrutura.quantidade}</Z.TabelaCell>
                  </Z.TabelaRow>
                ))}
              </tbody>
            </Z.Tabela>
          </Z.TabelaContainer>
        )}
      </Z.MainContent>
    </Z.Container>
  );
}


