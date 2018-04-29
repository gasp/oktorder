import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ORDER_FETCH_ORDER_BEGIN,
  ORDER_FETCH_ORDER_SUCCESS,
  ORDER_FETCH_ORDER_FAILURE,
  ORDER_FETCH_ORDER_DISMISS_ERROR,
} from 'src/features/order/redux/constants';

import {
  fetchOrder,
  dismissFetchOrderError,
  reducer,
} from 'src/features/order/redux/fetchOrder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('order/redux/fetchOrder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchOrder succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrder())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_FETCH_ORDER_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_FETCH_ORDER_SUCCESS);
      });
  });

  it('dispatches failure action when fetchOrder fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrder({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_FETCH_ORDER_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_FETCH_ORDER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchOrderError', () => {
    const expectedAction = {
      type: ORDER_FETCH_ORDER_DISMISS_ERROR,
    };
    expect(dismissFetchOrderError()).to.deep.equal(expectedAction);
  });

  it('handles action type ORDER_FETCH_ORDER_BEGIN correctly', () => {
    const prevState = { fetchOrderPending: false };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrderPending).to.be.true;
  });

  it('handles action type ORDER_FETCH_ORDER_SUCCESS correctly', () => {
    const prevState = { fetchOrderPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrderPending).to.be.false;
  });

  it('handles action type ORDER_FETCH_ORDER_FAILURE correctly', () => {
    const prevState = { fetchOrderPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrderPending).to.be.false;
    expect(state.fetchOrderError).to.exist;
  });

  it('handles action type ORDER_FETCH_ORDER_DISMISS_ERROR correctly', () => {
    const prevState = { fetchOrderError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ORDER_FETCH_ORDER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchOrderError).to.be.null;
  });
});
