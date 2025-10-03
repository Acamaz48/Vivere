import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: #d6d6d6; 
  font-size: 16px;
  color: black;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 12px 20px;
  width: 150px;

  > svg {
    margin: 0 8px 0 0;
  }

  &:hover {
    background-color: #adadadff;
  }
`;
