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
  color: #111827;
  margin-bottom: 20px;
`;

export const Mapa = styled.div`
  grid-area: 2 / 1 / 4 / 4;
  width: 100%;
  height: 390px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

export const CalendarioContainer = styled.div`
  grid-area: 2 / 4 / 4 / 5;
  margin: 27px 0 0 5px;
  height: 375px;
`;  

export const Informacoes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 320px;
  grid-template-rows: auto auto auto;
  gap: 12px;
  align-items: stretch;
`;

export const Imagens = styled.div`
  grid-area: 1 / 1 / 2 / 4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const ImagemA = styled.img`
  width: 220px;
  height: 140px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;

export const ImagemB = styled.img`
  grid-area: 1 / 4 / 3 / 5;
  width: 330px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
`;