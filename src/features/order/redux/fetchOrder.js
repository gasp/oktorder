import _ from 'lodash';
import axios from 'axios';

import { couch } from '../../../common/config';

import {
  ORDER_FETCH_ORDER_BEGIN,
  ORDER_FETCH_ORDER_SUCCESS,
  ORDER_FETCH_ORDER_FAILURE,
  ORDER_FETCH_ORDER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchOrder(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ORDER_FETCH_ORDER_BEGIN,
    });

    const url = `${couch.order}/_view/order?key="${args.orderId}"`;
    const promise = new Promise((resolve, reject) => {
      // if there is no orderId, this won't work :(
      if (!args.orderId) {
        const err = 'orderId is missing';
        dispatch({
          type: ORDER_FETCH_ORDER_FAILURE,
          data: { error: err },
        });
        return reject(err);
      }

      return axios.get(url).then(
        (res) => {
          dispatch({
            type: ORDER_FETCH_ORDER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: ORDER_FETCH_ORDER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchOrderError() {
  return {
    type: ORDER_FETCH_ORDER_DISMISS_ERROR,
  };
}

export function formatOrder(rows) {
  console.log(rows)
  return {};


  // select in the rows which is the order
  const order = rows.filter()
  // then populate items
  const flattened = rows.map(r => ({ id: r.id, ...r.value }));
  const mapped = _.mapKeys(flattened, 'id');
  return mapped;
}

export function reducer(state, action) {
  switch (action.type) {
    case ORDER_FETCH_ORDER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchOrderPending: true,
        fetchOrderError: null,
      };

    case ORDER_FETCH_ORDER_SUCCESS:
      // The request is success
      console.log(action.data);
      return {
        ...state,
        fetchOrderPending: false,
        fetchOrderError: null,
        orders: { ...state.orders , ...formatOrder(action.data.data.rows)}
      };

    case ORDER_FETCH_ORDER_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchOrderPending: false,
        fetchOrderError: action.data.error,
      };

    case ORDER_FETCH_ORDER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchOrderError: null,
      };

    default:
      return state;
  }
}
