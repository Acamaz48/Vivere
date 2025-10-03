import React, { useState } from "react";
import * as Z from "./styles";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <Z.Tela>
      <Z.Login>
        <Z.Titulo>VIVERE ENTRETERIMENTO</Z.Titulo>
        <Z.Label>Email:</Z.Label>
        <Z.Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Z.Label>Senha:</Z.Label>
        <Z.Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Z.labelError>{error}</Z.labelError>
        <Z.Button onClick={handleLogin}>Entrar</Z.Button>
      </Z.Login>
    </Z.Tela>
  );
};

export default Login;