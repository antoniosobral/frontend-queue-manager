import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';

import { useSpeechSynthesis } from 'react-speech-kit';
import Sound from 'react-sound';
import som from '../../sounds/alert-croped.wav';
import Logo from '../../images/logosobral.png';
import { Container } from './styles';
import api from '../../services/api';

require('dotenv/config');

export default function Tv() {
  const { speak } = useSpeechSynthesis();
  const [soundStatus, setSound] = useState(false);
  const [lastPassword, setLastPassword] = useState({});

  const userId = 'TV';

  const socket = useMemo(
    () =>
      socketio('http://192.168.15.14:3333', {
        query: {
          user_id: userId,
        },
      }),
    [userId]
  );

  async function getData() {
    const response = await api.get('/passwords');

    const called = response.data.filter(item => item.called);

    called.reverse();

    const last = called[0];

    setLastPassword(last);
  }
  useEffect(() => {
    getData();
  }, []);

  function passwordSound() {
    speak({ text: 'senha' });
    speak({ text: lastPassword.password_type });
    speak({ text: `guichê ${lastPassword.place}` });
    setSound(!soundStatus);
  }

  useEffect(() => {
    socket.on('lastPasswordTv', pass => {
      setLastPassword(pass);
    });

    // const texto = `senha ${lastPassword.password_type} favor dirigir-se ao guichê ${lastPassword.place} `;
  }, [lastPassword, socket]);

  return (
    <Container>
      <Sound
        url={som}
        playStatus={soundStatus ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => {
          passwordSound();
        }}
      />
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
