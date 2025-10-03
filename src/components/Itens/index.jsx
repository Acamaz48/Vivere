import React from 'react';
import { Container } from './styles';

const Itens = ({ Icon, Text, RightIcon, onClick, active = false }) => {
  return (
    <Container onClick={onClick} active={active}>
      {Icon && <Icon style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />}
      <span>{Text}</span>
      {RightIcon && <RightIcon style={{ marginLeft: 'auto', fontSize: '1rem' }} />}
    </Container>
  );
};

export default Itens;

