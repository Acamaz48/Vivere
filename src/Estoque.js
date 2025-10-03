import React, { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:5000/api";

const Estoque = () => {
  const [inventario, setInventario] = useState([]);

  const carregarInventario = () => {
    fetch(`${BASE_URL}/inventario`)
      .then(res => res.json())
      .then(data => {
        // Transforma os dados para exibição
        const itens = data.map(item => ({
          id: item.id,
          nome: item.material,
          categoria: item.categoria,
          quantidade: item.quantidade
        }));
        setInventario(itens);
      })
      .catch(err => console.error("Erro ao carregar inventário:", err));
  };

  useEffect(() => {
    carregarInventario();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventário</h2>
      <button onClick={carregarInventario}>Recarregar Inventário</button>
      <ul>
        {inventario.map(item => (
          <li key={item.id}>
            [{item.categoria}] {item.nome}: {item.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
