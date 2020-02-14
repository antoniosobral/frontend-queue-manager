import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import Logo from '../../images/logosobral.png';
import { Container } from './styles';
import api from '../../services/api';

require('dotenv/config');

const socket = socketio(process.env.APP_URL);

export default function Tv() {
  const [lastPassword, setLastPassword] = useState({
    password_type: '-',
    place: '-',
  });

  useEffect(() => {
    async function getData() {
      const response = await api.get('/passwords');

      response.data.map(item => (item.called ? setLastPassword(item) : item));
    }
    getData();
  }, []);

  useEffect(() => {
    socket.on('sendLastPassword', pass => {
      setLastPassword(pass);
    });
  }, [lastPassword]);

  return (
    <Container>
      <img src={Logo} alt="Logo" />

      <div id="senha">
        <h3>Senha</h3>
        <h2>{lastPassword.password_type}</h2>
      </div>
      <div id="guiche">
        <h3>Guichê</h3>
        <h2>{lastPassword.place}</h2>
      </div>
    </Container>
  );
}
