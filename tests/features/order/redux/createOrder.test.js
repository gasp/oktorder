import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ORDER_CREATE_ORDER_BEGIN,
  ORDER_CREATE_ORDER_SUCCESS,
  ORDER_CREATE_ORDER_FAILURE,
  ORDER_CREATE_ORDER_DISMISS_ERROR,
} from 'src/features/order/redux/constants';

import {
  createOrder,
  dismissCreateOrderError,
  reducer,
} from 'src/features/order/redux/createOrder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('order/redux/createOrder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createOrder succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createOrder())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_CREATE_ORDER_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_CREATE_ORDER_SUCCESS);
      });
  });

  it('dispatches failure action when createOrder fails', () => {
    const store = mockStore({});

    return store.dispatch(createOrder({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ORDER_CREATE_ORDER_BEGIN);
        expect(actions[1]).to.have.property('type', ORDER_CREATE_ORDER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateOrderError', () => {
    const expectedAction = {
      type: ORDER_CREATE_ORDER_DISMISS_ERROR,
    };
    expect(dismissCreateOrderError()).to.deep.equal(expectedAction);
  });

  it('handles action type ORDER_CREATE_ORDER_BEGIN correctly', () => {
    const prevState = { createOrderPending: false };
    const state = reducer(
      prevState,
      { type: ORDER_CREATE_ORDER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createOrderPending).to.be.true;
  });

  it('handles action type ORDER_CREATE_ORDER_SUCCESS correctly', () => {
    const prevState = { createOrderPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_CREATE_ORDER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createOrderPending).to.be.false;
  });

  it('handles action type ORDER_CREATE_ORDER_FAILURE correctly', () => {
    const prevState = { createOrderPending: true };
    const state = reducer(
      prevState,
      { type: ORDER_CREATE_ORDER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createOrderPending).to.be.false;
    expect(state.createOrderError).to.exist;
  });

  it('handles action type ORDER_CREATE_ORDER_DISMISS_ERROR correctly', () => {
    const prevState = { createOrderError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ORDER_CREATE_ORDER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createOrderError).to.be.null;
  });
});
