/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Form, Select } from '@rocketseat/unform';
import { FaHistory } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
import api from '../../services/api';

import { Container, ButtonSenha, Scroll } from './styles';

const socket = socketio('http://localhost:3333');

export default function User() {
  // const users = useSelector(state => state.auth);

  const [hasNext, sethasNext] = useState(false);
  const [place, setPlace] = useState();
  const [passwords] = useState([]);
  const [calledPasswords, setCalledPasswords] = useState([]);
  const [toCallPasswords, setToCallPasswords] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/passwords');

      const called = [];
      const toCall = [];

      response.data.map(item =>
        item.called ? called.push(item) : toCall.push(item)
      );

      if (toCall.length > 0) {
        sethasNext(true);
      } else {
        sethasNext(false);
      }

      called.reverse();

      setCalledPasswords(called);
      setToCallPasswords(toCall);
    }
    getData();
  }, []);

  useEffect(() => {
    socket.on('broadcast', pass => {
      sethasNext(true);
      setToCallPasswords([...toCallPasswords, pass]);
    });
  }, [toCallPasswords]);

  const guiches = [
    { id: '1', title: 'Guichê 1' },
    { id: '2', title: 'Guichê 2' },
    { id: '3', title: 'Guichê 3' },
    { id: '4', title: 'Guichê 4' },
    { id: '5', title: 'Guichê 5' },
    { id: '6', title: 'Guichê 6' },
    { id: '7', title: 'Guichê 7' },
    { id: '8', title: 'Guichê 8' },
    { id: '9', title: 'Guichê 9' },
    { id: '10', title: 'Guichê 10' },
  ];

  function changePlace(e) {
    setPlace(e.target.value);
  }

  async function handleCall(data) {
    if (toCallPasswords.length === 0) {
      toast.error('Não há senhas para serem chamadas!');
      return;
    }
    if (!place) {
      toast.error('Selecione um guichê!');
      return;
    }

    let id = '';
    for (let i = 0; i <= toCallPasswords.length; i = +1) {
      if (!toCallPasswords[i].called) {
        id = toCallPasswords[i]._id;

        toCallPasswords.splice(i, 1);

        break;
      }
    }

    const response = await api.put(`/passwords/?id=${id}&place=${data.guiche}`);

    setCalledPasswords([response.data, ...calledPasswords]);

    if (toCallPasswords.length > 0) {
      sethasNext(true);
    } else {
      sethasNext(false);
    }
  }

  async function handleReCall(password) {
    if (!place) {
      toast.error('Selecione um guichê!');
      return;
    }
    const id = password._id;

    await api.put(`/passwords/?id=${id}&place=${place}`);

    setCalledPasswords(
      calledPasswords.map(pass => (pass._id === id ? { ...pass, place } : pass))
    );
  }

  return (
    <Container>
      <div id="callForm">
        <Form onSubmit={handleCall}>
          <Select
            type="select"
            name="guiche"
            options={guiches}
            placeholder="Selecione um guichê"
            className="minimal"
            onChange={changePlace}
          />
          <ButtonSenha hasNext={hasNext}>
            <button type="submit">Próxima Senha</button>
          </ButtonSenha>
        </Form>
      </div>
      <div id="filas">
        <div className="showFilas" id="toCall">
          <h2>Senhas na Fila</h2>
          <Scroll>
            <table>
              <thead>
                <tr>
                  <th>Senha</th>
                  <th>Hora Emissão</th>
                </tr>
              </thead>
              {toCallPasswords.map(password => (
                <tbody>
                  <tr key={password._id}>
                    <td>{password.password_type}</td>
                    <td>
                      {format(
                        parseISO(password.updatedAt),
                        'dd/MM/yyyy - kk:mm:ss'
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Scroll>
        </div>
        <div className="showFilas" id="called">
          <h2>Senhas chamadas</h2>
          <Scroll>
            <table>
              <thead>
                <tr>
                  <th>Guichê</th>
                  <th>Colaborador</th>
                  <th>Senha</th>
                  <th>Hora Emissão</th>
                  <th>Chamar Novamente</th>
                </tr>
              </thead>
              {calledPasswords.map(password => (
                <tbody>
                  <tr>
                    <td>{password.place}</td>
                    <td>{password.called_by}</td>
                    <td>{password.password_type}</td>
                    <td>
                      {format(
                        parseISO(password.updatedAt),
                        'dd/MM/yyyy - kk:mm:ss'
                      )}
                    </td>
                    <td>
                      <div id="icons">
                        <FaHistory
                          onClick={() => handleReCall(password)}
                          cursor="pointer"
                          key={passwords._id}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Scroll>
        </div>
      </div>
    </Container>
  );
}
