import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;              
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 160px;         
  }
`;

export const Content = styled.div`
  padding: 16px 12px;

  img {
    display: block;
    max-width: 100%;
    margin: 12px auto 28px auto;
    object-fit: contain;
  }
`;