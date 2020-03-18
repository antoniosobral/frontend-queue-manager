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
  const [lastPassword, setLastPassword] = useState({
    password_type: '-',
    place: '-',
  });

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

  useEffect(() => {
    async function getData() {
      const response = await api.get('/passwords');

      const called = response.data.filter(item => item.called);

      if (called.length) {
        called.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateA - dateB;
        });

        called.reverse();

        const last = called[0];

        setLastPassword(last);
      }
    }
    getData();
  }, []);

  function passwordSound() {
    speak({ text: 'senha' });
    speak({ text: lastPassword.password_type });
    speak({ text: `guichê ${lastPassword.place}` });
    setSound(!soundStatus);
  }

  useEffect(() => {
    socket.once('lastPasswordTv', pass => {
      setLastPassword(pass);
    });
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
