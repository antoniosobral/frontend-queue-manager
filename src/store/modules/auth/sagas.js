/* eslint-disable camelcase */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { user_id, password } = payload;

    const response = yield call(api.post, 'sessions', { user_id, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch {
    yield put(signFailure());
    toast.error('Usuário/senha incorreto!');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
