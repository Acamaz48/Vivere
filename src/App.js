import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Materiais from "./pages/Estoque/materiais";
import Estruturas from "./pages/Estoque/estruturas";
import Historico from "./pages/Historico";
import Evento from "./pages/Eventos";
import Login from "./pages/Login";  // importa a tela de login

export default function App() {
  return (
    <Router>
      <Routes>
        {/* rota inicial (login) */}
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estoque/materiais" element={<Materiais />} />
        <Route path="/estoque/estruturas" element={<Estruturas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/eventos" element={<Evento />} />
      </Routes>
    </Router>
  );
}
