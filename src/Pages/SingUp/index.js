import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Container, Content } from './styles';

import logo from '../../images/logosobral.png';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <Container>
      <Content>
        <img src={logo} alt="Sobral" />

        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder=" Usuário" name="user_id" />
          <Input type="password" placeholder="Senha" name="password" />

          <button type="submit">Cadastrar usuário</button>
        </Form>
      </Content>
    </Container>
  );
}
