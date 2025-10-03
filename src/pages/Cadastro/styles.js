import styled from "styled-components";

const SIDEBAR_WIDTH = 200;

const InputBase = `
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

const LabelEstilo = `
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 15px;
  color: #4A5568;
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 30px;
  padding-left: ${SIDEBAR_WIDTH + 30}px;
  background: #AEADAD;
`;

export const FormContainer = styled.div`
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

export const Form = styled.form`

  display: grid;
  column-gap: 20px;
  row-gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  input, select, textarea {
    ${InputBase}
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  label { ${LabelEstilo} }

  ${props => props.$full && `
    grid-column: 1 / -1;
  `}
`;

export const Botao = styled.button`
  grid-column: 1 / -1;
  background-color: #ED730B;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: filter .15s ease, transform .02s ease;

  &:hover {
    filter: brightness(0.96);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const SelectedMaterialsList = styled.select`

`;

export const MaterialItem = styled.option`

`;