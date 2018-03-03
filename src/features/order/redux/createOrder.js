import axios from 'axios';

import { couch } from '../../../common/config';
import guid from '../../../common/guid';

import {
  ORDER_CREATE_ORDER_BEGIN,
  ORDER_CREATE_ORDER_SUCCESS,
  ORDER_CREATE_ORDER_FAILURE,
  ORDER_CREATE_ORDER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createOrder(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ORDER_CREATE_ORDER_BEGIN,
    });
    return new Promise((resolve, reject) => {
      const uid = guid();
      axios.put(`${couch.db}/${uid}`, { ...args.payload, id: uid }).then(
        (res) => {
          dispatch({
            type: ORDER_CREATE_ORDER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ORDER_CREATE_ORDER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCreateOrderError() {
  return {
    type: ORDER_CREATE_ORDER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ORDER_CREATE_ORDER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOrderPending: true,
        createOrderError: null,
      };

    case ORDER_CREATE_ORDER_SUCCESS:
      // The request is success
      return {
        ...state,
        createOrderPending: false,
        createOrderError: null,
      };

    case ORDER_CREATE_ORDER_FAILURE:
      // The request is failed
      return {
        ...state,
        createOrderPending: false,
        createOrderError: action.data.error,
      };

    case ORDER_CREATE_ORDER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOrderError: null,
      };

    default:
      return state;
  }
}
