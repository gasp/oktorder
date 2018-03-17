// import _ from 'lodash';
import axios from 'axios';

import { couch } from '../../../common/config';

import {
  ORDER_FETCH_ORDERS_BEGIN,
  ORDER_FETCH_ORDERS_SUCCESS,
  ORDER_FETCH_ORDERS_FAILURE,
  ORDER_FETCH_ORDERS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchOrders(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ORDER_FETCH_ORDERS_BEGIN,
    });

    const url = `${couch.order}/_view/my?tag="Nina"`; // FIXME: Nina  + " = %22 ?
    return new Promise((resolve, reject) => {
      axios.get(url).then(
        (res) => {
          dispatch({
            type: ORDER_FETCH_ORDERS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ORDER_FETCH_ORDERS_FAILURE,
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
export function dismissFetchOrdersError() {
  return {
    type: ORDER_FETCH_ORDERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ORDER_FETCH_ORDERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchOrdersPending: true,
        fetchOrdersError: null,
      };

    case ORDER_FETCH_ORDERS_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchOrdersPending: false,
        fetchOrdersError: null,
      };

    case ORDER_FETCH_ORDERS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchOrdersPending: false,
        fetchOrdersError: action.data.error,
      };

    case ORDER_FETCH_ORDERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchOrdersError: null,
      };

    default:
      return state;
  }
}
