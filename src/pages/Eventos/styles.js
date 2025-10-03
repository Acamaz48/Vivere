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
  min-height: 100vh;
  padding: 30px;
  padding-left: ${SIDEBAR_WIDTH + 30}px;
  background: #AEADAD;
`;

export const Container = styled.div`
  padding: 30px;
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
  margin-bottom: 22px;
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
  border: 1px solid #ED730B;
  box-sizing: border-box;
  height: auto; 
`;

export const TituloTabela = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const Sessao = styled.section`
  margin-top: 2rem;
`;

export const TituloSessao = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 300px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitulo = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #007bff;
`;

export const CardInfo = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const CardLabel = styled.span`
  font-weight: 600;
  color: #555;
  margin-right: 0.5rem;
`;

export const CardTexto = styled.span`
  color: #333;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CardSubtitulo = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #888;
`;

// Estilos do Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

export const ModalTitulo = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #007bff;
`;

export const ModalSubtitulo = styled.h3`
  font-size: 1.25rem;
  font-weight: normal;
  color: #555;
  margin-bottom: 1.5rem;
`;

export const ModalInfo = styled.div`
  margin-bottom: 1rem;
`;

export const ModalSecaoTitulo = styled.h4`
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const ModalItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

export const ModalItemTexto = styled.span`
  font-weight: 500;
`;

export const ModalItemQuantidade = styled.span`
  color: #777;
`;

export const BotaoAcao = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  align-self: flex-end;
  margin-top: 1rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const ModalTableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
`;

export const ModalTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const ModalTableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
`;
export const CardAcoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px; /* Adiciona um espaço entre os elementos */
  margin-top: 1rem;
`;

export const BotaoFinalizar = styled.button`
  background-color: #dc3545; /* Cor vermelha para destacar a ação */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #c82333;
  }
`;

export const DropdownStatus = styled.select`
  flex: 1; /* Faz o dropdown ocupar o espaço restante */
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #f8f9fa;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;