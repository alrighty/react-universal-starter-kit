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

const initialState = {
  isLoading: false,
  error: null,
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {

  case LOGIN:
    return {
      ...initialState,
      isLoading: true
    };

  case LOGOUT:
  case CHECK_AUTH:
    return {
      ...state,
      isLoading: true
    };

  case LOGIN_SUCCESS:
  case CHECK_AUTH_SUCCESS:
    return {
      ...initialState,
      user: payload
    };

  case LOGOUT_SUCCESS:
    return initialState

  case LOGIN_ERROR:
  case LOGOUT_ERROR:
  case CHECK_AUTH_ERROR:
    return {
      ...initialState,
      error
    };
  
  default:
      return state;
  }
}
