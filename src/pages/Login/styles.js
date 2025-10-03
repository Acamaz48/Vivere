import styled from "styled-components";

export const Tela = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  
`;

export const Login = styled.div`
  gap: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #00000063;
  background-color: white;
  max-width: 320px;
  padding: 20px;
  border-radius: 5px;
`;

export const Titulo = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin: 10px 0;
  align-self: center;
`;

export const Label = styled.label`
  margin-bottom: -10px; 
  font-weight: 600;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;

export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;

  background-color: #f0f2f5;
  border: none;
`;

export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: #EB740B;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 320px;

  &:hover {
    background-color: #d56606ff;
  }
`;