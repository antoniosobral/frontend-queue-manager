/* eslint-disable camelcase */
import React from 'react';
import { toast } from 'react-toastify';
import { Container, Password, Content } from './styles';
import api from '../../services/api';

import logo from '../../images/logosobral.png';

export default function Totem() {
  async function handleClick(line) {
    const queue = line;

    await api.post('/passwords', { queue });

    toast.success('Sua senha foi emitida com sucesso!');
  }
  return (
    <Container>
      <img src={logo} alt="Sobral" />
      <h1>SELECIONE UMA OPÇÃO ABAIXO</h1>

      <Content>
        <Password id="comum" onClick={() => handleClick('C')}>
          <h2>COMUM</h2>
        </Password>
        <Password id="priority" onClick={() => handleClick('P')}>
          <h2>PRIORITÁRIA</h2>
        </Password>
      </Content>
    </Container>
  );
}
