/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import ReactToPrint from 'react-to-print';
import { Container, Password, Content, PrintPassword, Pass } from './styles';
import api from '../../services/api';

import logo from '../../images/logosobral.png';

export default function Totem() {
  const [passInfo, setPassinfo] = useState({ password: '' });

  const print = useRef();
  async function handleClick(line) {
    const queue = line;
    const password = await api.post('/passwords', { queue });

    setPassinfo({ password: password.data.password_type });

    toast.success('Sua senha foi emitida com sucesso!');

    print.current.click();
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
        <Password id="comum" onClick={() => handleClick('comum')}>
          <h2>COMUM</h2>
        </Password>
        <Password id="priority" onClick={() => handleClick('priority')}>
          <ReactToPrint
            trigger={() => (
              <Pass>
                <h2>PRIORITÁRIA</h2>
              </Pass>
            )}
            content={() => componentRef.current}
          />
        </Password>
      </Content>
    </Container>
  );
}
