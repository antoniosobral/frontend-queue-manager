import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import User from '../Pages/User';
import Tv from '../Pages/Tv';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SingUp';
import Totem from '../Pages/Totem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/tv" component={Tv} isPrivate />
      <Route path="/dashboard" component={User} isPrivate />
      <Route path="/register" component={SignUp} isPrivate />
      <Route path="/totem" component={Totem} isPrivate />
    </Switch>
  );
}
