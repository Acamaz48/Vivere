// src/main.js
import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Estoque from "./pages/Estoque";
import Historico from "./pages/Historico";
import Evento from "./pages/Eventos";
import { BASE_URL } from "./config";

const Main = () => {
  const [inventario, setInventario] = useState([]);

  const carregarInventario = () => {
    fetch(`${BASE_URL}/inventario`)
      .then(res => res.json())
      .then(data => setInventario(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarInventario();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estoque" element={<Estoque inventario={inventario} recarregar={carregarInventario} />} />
        <Route path="/evento" element={<Evento />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </>
  );
};

export default Main;
