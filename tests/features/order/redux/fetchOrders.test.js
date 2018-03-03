import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ORDER_FETCH_ORDERS_BEGIN,
  ORDER_FETCH_ORDERS_SUCCESS,
  ORDER_FETCH_ORDERS_FAILURE,
  ORDER_FETCH_ORDERS_DISMISS_ERROR,
} from 'src/features/order/redux/constants';

import {
  fetchOrders,
  dismissFetchOrdersError,
  reducer,
} from 'src/features/order/redux/fetchOrders';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('order/redux/fetchOrders', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchOrders succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrders())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_FETCH_ORDERS_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_FETCH_ORDERS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchOrders fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrders({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_FETCH_ORDERS_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_FETCH_ORDERS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchOrdersError', () => {
    const expectedAction = {
      type: ORDER_FETCH_ORDERS_DISMISS_ERROR,
    };
    expect(dismissFetchOrdersError()).to.deep.equal(expectedAction);
  });

  it('handles action type ORDER_FETCH_ORDERS_BEGIN correctly', () => {
    const prevState = { fetchOrdersPending: false };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrdersPending).to.be.true;
  });

  it('handles action type ORDER_FETCH_ORDERS_SUCCESS correctly', () => {
    const prevState = { fetchOrdersPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrdersPending).to.be.false;
  });

  it('handles action type ORDER_FETCH_ORDERS_FAILURE correctly', () => {
    const prevState = { fetchOrdersPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrdersPending).to.be.false;
    expect(state.fetchOrdersError).to.exist;
  });

  it('handles action type ORDER_FETCH_ORDERS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchOrdersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrdersError).to.be.null;
  });
});
