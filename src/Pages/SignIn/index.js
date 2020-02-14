/* eslint-disable camelcase */
import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Content } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../images/logosobral.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ user_id, password }) {
    dispatch(signInRequest(user_id, password));
  }
  return (
    <Container>
      <Content>
        <img src={logo} alt="Sobral" />

        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Seu usuário" name="user_id" />
          <Input type="password" placeholder="Sua senha" name="password" />

          <button type="submit">{loading ? 'Carregando..' : 'Acessar'}</button>
        </Form>
      </Content>
    </Container>
  );
}
