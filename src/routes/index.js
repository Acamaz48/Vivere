import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/index.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Cadastro from "../pages/Cadastro/index.jsx";
import Estoque from "../pages/Estoque/index.jsx";
import Historico from "../pages/Historico/index.jsx";
import OrdemDeServico from "../pages/Eventos/index.jsx";
import ExemploEstoque from "../ExemploEstoque.jsx"; // importar aqui se for usado só na rota

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/estoque"
          element={
            <>
              <Estoque />
              <ExemploEstoque /> {/* aqui só aparece dentro da rota /estoque */}
            </>
          }
        />
        <Route path="/historico" element={<Historico />} />
        <Route path="/evento" element={<OrdemDeServico />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
