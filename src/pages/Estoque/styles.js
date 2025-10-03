import styled from "styled-components";

const SIDEBAR_WIDTH = 200;

export const Tela = styled.div`
  display: grid;
  min-height: 100vh;
`;

export const InputBase = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const MainContent = styled.main`
  padding: 30px;
  padding-left: ${SIDEBAR_WIDTH + 30}px;
  background: #AEADAD;
`;

export const Container = styled.div`
  background-color: #FFFFFF;
  padding: 28px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Titulo = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  color: #111827;
  margin:0 0 22px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #CBD5E0;
  border-radius: 6px;
  background-color: #FDFDFD;
  font-size: 14px;
  color: #2D3748;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #ed740bb6;
    box-shadow: 0 0 0 2px #fd760023;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 15px;
  color: #4A5568;
`;


export const FormContainer = styled.form`
  display: grid;
  gap: 16px 20px;
  background-color: #fff;
  padding: 12px;
`;

export const Button = styled.button`
  background-color: #ED730B; 
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 40px;

  &:hover { background-color: #d56606ff; }
`;

export const TabelaContainer = styled.div`
  padding: 30px;
  width: 100%;             
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const TabelaHeader = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
`;

export const TabelaRow = styled.tr`

`;

export const TabelaCell = styled.td`
  border: 1px solid #ddd;
  font-size: 14px;
  padding: 8px;
  word-wrap: break-word;
`;

export const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
  align-items: end;
  margin-bottom: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`;

export const FiltroGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 16px 20px;
  align-items: end;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr); 
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr; 
  }
`;

export const InputDeTabela = styled.input`
  width: 100%;
  padding: 6px;
  margin: 0;
  box-sizing: border-box;
  height: auto; 

  &:focus {
    outline: none;
    border-radius: 3px;
    border: 1px solid #ed740bb6;
    box-shadow: 0 0 0 2px #fd760023;
  }
`;

export const ButtonAdicionar = styled.button`

`;

export const ButtonSalvar = styled.button`

`;

export const PaginacaoContainer = styled.div`

`;

export const ButtonPaginacao = styled.button`

`;

export const ButtonExportar = styled.button`

`;