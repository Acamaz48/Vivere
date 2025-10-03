import React, { useState } from 'react';
import { Container, Content } from './styles';
import { MdDashboard } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import Itens from '../Itens';
import Logomarca_Vivere from '../../assets/Logomarca_Vivere.png';
import { useNavigate, useLocation } from "react-router-dom";

const BarraLateral = ({ active = true }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Abre o dropdown automaticamente se a rota for /estoque/materiais ou /estoque/estruturas
  const [estoqueOpen, setEstoqueOpen] = useState(pathname.startsWith('/estoque'));

  const handleEstoqueClick = () => setEstoqueOpen(!estoqueOpen);

  return (
    <Container sidebar={active}>
      <Content>
        <img src={Logomarca_Vivere} alt="Logomarca Vivere" />

        <Itens
          Icon={MdDashboard}
          Text="Dashboard"
          active={pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />

        <Itens
          Icon={LuFileSpreadsheet}
          Text="Cadastro"
          active={pathname === '/cadastro'}
          onClick={() => navigate('/cadastro')}
        />

        {/* Estoque como dropdown */}
        <div>
          <Itens
            Icon={GiBookshelf}
            Text="Estoque"
            active={pathname.startsWith('/estoque')}
            onClick={handleEstoqueClick}
            RightIcon={estoqueOpen ? FiChevronDown : FiChevronRight}
          />
          {estoqueOpen && (
            <div style={{ marginLeft: "1.5rem", display: "flex", flexDirection: "column" }}>
              <Itens
                Text="Materiais"
                active={pathname === '/estoque/materiais'}
                onClick={() => navigate('/estoque/materiais')}
              />
              <Itens
                Text="Estruturas"
                active={pathname === '/estoque/estruturas'}
                onClick={() => navigate('/estoque/estruturas')}
              />
            </div>
          )}
        </div>

        <Itens
          Icon={BsFileEarmarkSpreadsheet}
          Text="Histórico"
          active={pathname === '/historico'}
          onClick={() => navigate('/historico')}
        />

        <Itens
          Icon={PiMicrophoneStageFill}
          Text="Evento"
          active={pathname === '/evento'}
          onClick={() => navigate('/evento')}
        />
      </Content>

      <Content>
        <Itens
          Icon={IoHelpCircleOutline}
          Text="Ajuda"
          active={pathname === '/ajuda'}
          onClick={() => navigate('/ajuda')}
        />
        <Itens
          Icon={IoMdExit}
          Text="Sair"
          onClick={() => navigate('/')}
        />
      </Content>
    </Container>
  );
};

export default BarraLateral;
