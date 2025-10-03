import styled from "styled-components";

const SIDEBAR_WIDTH = 200;

export const Tela = styled.div`
  display: grid;
  min-height: 100vh;
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
  margin-bottom: 22px;
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

export const HistoricoList = styled.div`
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden; 
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    border-bottom: none; 
  }

  &:hover {
    background-color: #f5f5f5; /
  }
`;

export const ListItemContent = styled.div`
  flex: 1; 
`;

export const ListItemTitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #333;
  gap: 8px;

  strong {
    font-weight: 600;
  }
`;

export const ListItemTimestamp = styled.div`
  font-size: 0.85rem;
  color: #777;
  margin-left: 15px;
  white-space: nowrap;
`;

export const EmptyState = styled.p`
    text-align: center;
    padding: 20px;
    color: #888;
`;

export const ListItemWrapper = styled.div`
  border: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden;
`;

export const DetailsContent = styled.div`
  padding: 16px;
  background-color: #fafafa;

  h4 {
    margin-top: 0;
    margin-bottom: 12px;
  }
  
  p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
  }

  p strong {
    color: #000;
    min-width: 120px;
    display: inline-block;
  }
`;
