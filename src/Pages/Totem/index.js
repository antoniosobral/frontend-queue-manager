/* eslint-disable camelcase */
import React, { useState, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import socketio from 'socket.io-client';

import ReactToPrint from 'react-to-print';
import { Container, Password, Content, PrintPassword, Pass } from './styles';
import api from '../../services/api';

import logo from '../../images/logosobral.png';

export default function Totem() {
  const [passInfo, setPassinfo] = useState({ password: '' });
  const [queues] = useState([
    { queue: 'comum', caption: 'ATENDIMENTO', color: '#A20000' },
    { queue: 'priority', caption: 'ATENDIMENTO PRIORITÁRIO', color: '#A20000' },
    { queue: 'results', caption: 'RESULTADOS', color: '#A20000' },
    { queue: 'pendencies', caption: 'PENDÊNCIAS', color: '#A20000' },
    { queue: 'budgets', caption: 'ORÇAMENTOS', color: '#A20000' },
  ]);

  const user = 'TOTEM';
  const socket = useMemo(
    () =>
      socketio('http://159.89.181.231', {
        query: {
          user_id: user.name,
        },
      }),
    [user.name]
  );

  const print = useRef();
  async function handleClick(line) {
    const queue = line;
    const password = await api.post('/passwords', { queue });

    setPassinfo({ password: password.data.password_type });

    print.current.click();

    socket.emit('newPassword', password.data);
    toast.success('Sua senha foi emitida com sucesso!');
  }

  const componentRef = useRef();

  return (
    <Container>
      <img src={logo} alt="Sobral" />
      <h1>SELECIONE UMA OPÇÃO ABAIXO</h1>

      <Content>
        <div style={{ display: 'none' }}>
          <ReactToPrint
            trigger={() => <Pass ref={print} />}
            content={() => componentRef.current}
          />

          <PrintPassword ref={componentRef}>
            <h2>SENHA</h2>

            <h1>{passInfo.password}</h1>
          </PrintPassword>
        </div>
        {queues.map(q => (
          <>
            <Password key={q.queue} onClick={() => handleClick(q.queue)}>
              <h2>{q.caption}</h2>
            </Password>
          </>
        ))}
      </Content>
    </Container>
  );
}
