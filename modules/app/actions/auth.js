import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
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
      endpoint: '/login',
      data: values,
      formatter: (json) => console.log(json)
      // schema: Schemas.USER
    },
    meta: { values }
  };
}
