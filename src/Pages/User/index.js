/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select } from '@rocketseat/unform';
import { FaHistory } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import socketio from 'socket.io-client';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';

import { Container, ButtonSenha, Scroll, Header } from './styles';

require('dotenv/config');

export default function Test() {
  const [hasNext, sethasNext] = useState(false);
  const [place, setPlace] = useState();
  const [calledPasswords, setCalledPasswords] = useState([]);
  const [toCallPasswords, setToCallPasswords] = useState([]);

  const dispatch = useDispatch();

  const [tableHeaders] = useState([
    { id: '1', name: 'Guichê' },
    { id: '2', name: 'Colaborador' },
    { id: '3', name: 'Senha' },
    { id: '4', name: 'Emitida em' },
    { id: '5', name: 'Chamar novamente' },
  ]);

  const user = useSelector(state => state.user.profile);
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: user.name,
        },
      }),
    [user.name]
  );

  async function getData() {
    const response = await api.get('/passwords');

    const called = response.data.filter(item => item.called);

    let toCall = response.data.filter(item => !item.called);

    const comum = [];
    const priority = [];

    if (toCall) {
      toCall.map(item =>
        item.queue === 'comum' ? comum.push(item) : priority.push(item)
      );

      toCall = priority.concat(comum);
    }

    called.reverse();

    setToCallPasswords(toCall);
    setCalledPasswords(called);

    if (toCall.length > 0) {
      sethasNext(true);
    } else {
      sethasNext(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket.on('updatePasswords', data => {
      setToCallPasswords(data.to_call);
      setCalledPasswords(data.to_called);
    });

    socket.on('updateRecall', data => {
      setCalledPasswords(data);
    });
  }, [socket, calledPasswords]);

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

  async function handleCall() {
    if (toCallPasswords.length === 0) {
      toast.error('Não há senhas para serem chamadas!');
      return;
    }
    if (!place) {
      toast.error('Selecione um guichê!');
      return;
    }
    const next = toCallPasswords.shift();
    const id = next._id;

    const password = await api.put(
      `/passwords/?id=${id}&place=${place}&called_by=${user.name}`
    );

    const to_call = toCallPasswords.filter(p => p._id !== id);
    const to_called = [password.data, ...calledPasswords];

    socket.emit('updatePasswords', {
      to_call,
      to_called,
    });

    socket.emit('lastPasswordTv', password.data);

    if (toCallPasswords.length) {
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
    const pass = await api.put(
      `/passwords/?id=${id}&place=${place}&called_by=${user.name}`
    );
    const updatedCalled = calledPasswords.filter(p => p._id !== pass.data._id);

    const to_called = [pass.data, ...updatedCalled];

    socket.emit('lastPasswordTv', pass.data);
    socket.emit('updateRecall', to_called);
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <h1>Olá, {user.name}</h1>
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </Header>
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
              <tbody>
                {toCallPasswords.map(password => (
                  <tr key={password._id}>
                    <td>{password.password_type}</td>
                    <td>
                      {format(
                        parseISO(password.updatedAt),
                        'dd/MM/yyyy - kk:mm:ss'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroll>
        </div>
        <div className="showFilas" id="called">
          <h2>Senhas chamadas</h2>
          <Scroll>
            <table>
              <thead>
                <tr>
                  {tableHeaders.map(tableHead => (
                    <th key={tableHead.id}>{tableHead.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calledPasswords.map(password => (
                  <tr key={password._id}>
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
                          key={password._id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroll>
        </div>
      </div>
    </Container>
  );
}
