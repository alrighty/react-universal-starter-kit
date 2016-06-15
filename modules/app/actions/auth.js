import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,

  CHECK_AUTH,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_ERROR
} from 'app/constants/ActionTypes';
import { CALL_API /*, Schemas */ } from 'app/middleware/api';

export function login(values) {
  return {
    [CALL_API]: {
      types: [
        LOGIN,
        LOGIN_SUCCESS,
        LOGIN_ERROR
      ],
      method: 'GET',
      endpoint: '/auth/login',
      data: values,
      formatter: (json) => console.log(json)
      // schema: Schemas.USER
    },
    meta: { values }
  };
}

export function logout() {
  return {
    [CALL_API]: {
      types: [
        LOGOUT,
        LOGOUT_SUCCESS,
        LOGOUT_ERROR,
      ],
      method: 'GET',
      endpoint: '/auth/logout',
      formatter: () => {}
    }
  };
}

export function checkAuth() {
  return {
    [CALL_API]: {
      types: [
        CHECK_AUTH,
        CHECK_AUTH_SUCCESS,
        CHECK_AUTH_ERROR
      ],
      method: 'GET',
      endpoint: '/auth/me',
      formatter: (json) => json
    }
  };
}
