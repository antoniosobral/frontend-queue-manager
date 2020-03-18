/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { Form, Select, Input } from '@rocketseat/unform';
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
  const [showPass, setShowPass] = useState([]);
  const [calledPasswords, setCalledPasswords] = useState([]);
  const [toCallPasswords, setToCallPasswords] = useState([]);
  const [queues, setQueues] = useState([
    { queue: 'comum', caption: 'Atendimento Comum', selected: true },
    { queue: 'priority', caption: 'Atendimento prioritário', selected: true },
    { queue: 'results', caption: 'Resultados', selected: true },
    { queue: 'pendencies', caption: 'Pendências', selected: true },
    { queue: 'budgets', caption: 'Orçamentos', selected: true },
  ]);

  const dispatch = useDispatch();

  const [tableHeaders] = useState([
    { id: '1', name: 'Senha' },
    { id: '2', name: 'Guichê' },
    { id: '3', name: 'Colaborador' },
    { id: '4', name: 'Emitida em' },
    { id: '5', name: 'Chamar novamente' },
  ]);

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

  const user = useSelector(state => state.user.profile);
  const socket = useMemo(
    () =>
      socketio('http://192.168.15.14:3333', {
        query: {
          user_id: user.name,
        },
      }),
    [user.name]
  );

  useEffect(() => {
    async function updateQueues() {
      const response = await api.get('/passwords');

      const to_call = response.data.filter(item => !item.called);

      let to_show = [];

      queues.map(q => {
        to_call.map(pass => {
          if (q.selected && pass.queue === q.queue) {
            to_show.push(pass);
          }
        });
      });

      to_show.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateA - dateB;
      });

      const priority = to_show.filter(item => item.queue === 'priority');
      const rest = to_show.filter(item => item.queue !== 'priority');

      to_show = priority.concat(rest);

      setShowPass(to_show);
    }

    socket.once('newPassword', p => {
      console.log('p');
      setToCallPasswords([...toCallPasswords, p]);
    });
    updateQueues();
  }, [queues, toCallPasswords, socket]);

  async function getData() {
    const response = await api.get('/passwords');
    const called = response.data.filter(item => item.called);

    const toCall = response.data.filter(item => !item.called);

    const priority = [];

    const call = priority.concat(toCall.filter(p => p.queue !== 'priority'));

    called.reverse();

    setShowPass(call);
    setToCallPasswords(call);
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
    const next = showPass.shift();
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

  function toggleQueue(data) {
    const { selected, queue } = data;

    setQueues(
      queues.map(q => (q.queue === queue ? { ...q, selected: !selected } : q))
    );
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
        <div id="check">
          {queues.map(queue => (
            <div className="checkboxes">
              <Input
                type="checkbox"
                name={queue.queue}
                id={queue.queue}
                value={queue.queue}
                onChange={() => toggleQueue(queue)}
                checked={queue.selected}
              />
              <span className="checkbox-custom" />
              <label htmlFor={queue.queue}>{queue.caption}</label>
            </div>
          ))}
        </div>
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
                {showPass.map(password => (
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
                    <td>{password.password_type}</td>
                    <td>{password.place}</td>
                    <td>{password.called_by}</td>
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
