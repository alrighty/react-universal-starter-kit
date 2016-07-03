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
} from 'app/constants/ActionTypes'
import { CALL_API, Schemas } from 'app/middleware/api'

export function login(email, password) {
  return {
    [CALL_API]: {
      types: [
        LOGIN,
        LOGIN_SUCCESS,
        LOGIN_ERROR
      ],
      variables: {
        email,
        password
      },
      query: `
        mutation {
          login($email: String!, $password: String!) {
            id
            name
            github {
              username
            }
          }
        }
      `
    }
  }
}

export function logout() {
  return {
    [CALL_API]: {
      types: [
        LOGOUT,
        LOGOUT_SUCCESS,
        LOGOUT_ERROR
      ],
      query: `
        mutation {
          logout {
            id
          }
        }
      `
    }
  }
}

export function checkAuth() {
  return {
    [CALL_API]: {
      types: [
        CHECK_AUTH,
        CHECK_AUTH_SUCCESS,
        CHECK_AUTH_ERROR
      ],
      schema: {
        me: Schemas.USER
      },
      query: `
        query {
          me {
            id
            name
            github {
              username
            }
          }
        }
      `
    }
  }
}
