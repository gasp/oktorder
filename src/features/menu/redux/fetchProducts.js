import _ from 'lodash';
import axios from 'axios';

import { couch } from '../../../common/config';

import {
  MENU_FETCH_PRODUCTS_BEGIN,
  MENU_FETCH_PRODUCTS_SUCCESS,
  MENU_FETCH_PRODUCTS_FAILURE,
  MENU_FETCH_PRODUCTS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchProducts(args = {}) {
  // console.log(`fetchProducts args ${args}`);
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: MENU_FETCH_PRODUCTS_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      const cat = args.cat || 'prime';
      axios.get(`${couch.product}/_view/category?key=%22${cat}%22`).then(
        (res) => {
          dispatch({
            type: MENU_FETCH_PRODUCTS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: MENU_FETCH_PRODUCTS_FAILURE,
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
export function dismissFetchProductsError() {
  return {
    type: MENU_FETCH_PRODUCTS_DISMISS_ERROR,
  };
}

export function formatProduct(rows) {
  const flattened = rows.map(r => ({ id: r.id, ...r.value }));
  const mapped = _.mapKeys(flattened, 'id');

  console.log('%c here is the magic', 'color: pink');
  // console.log(rows, mapped);
  return mapped;
}

export function reducer(state, action) {
  switch (action.type) {
    case MENU_FETCH_PRODUCTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchProductsPending: true,
        fetchProductsError: null,
      };

    case MENU_FETCH_PRODUCTS_SUCCESS:
      // The request is success
      // //, ..._.mapKeys(action.payload.data, 'id') },
      return {
        ...state,
        fetchProductsPending: false,
        fetchProductsError: null,
        // products: { ...state.products },
        products: { ...state.products, ...formatProduct(action.data.data.rows) },
      };

    case MENU_FETCH_PRODUCTS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchProductsPending: false,
        fetchProductsError: action.data.error,
      };

    case MENU_FETCH_PRODUCTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchProductsError: null,
      };

    default:
      return state;
  }
}
