import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  MENU_FETCH_PRODUCTS_BEGIN,
  MENU_FETCH_PRODUCTS_SUCCESS,
  MENU_FETCH_PRODUCTS_FAILURE,
  MENU_FETCH_PRODUCTS_DISMISS_ERROR,
} from 'src/features/menu/redux/constants';

import {
  fetchProducts,
  dismissFetchProductsError,
  reducer,
} from 'src/features/menu/redux/fetchProducts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('menu/redux/fetchProducts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchProducts succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchProducts())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MENU_FETCH_PRODUCTS_BEGIN);
        expect(actions[1]).to.have.property('type', MENU_FETCH_PRODUCTS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchProducts fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchProducts({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', MENU_FETCH_PRODUCTS_BEGIN);
        expect(actions[1]).to.have.property('type', MENU_FETCH_PRODUCTS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchProductsError', () => {
    const expectedAction = {
      type: MENU_FETCH_PRODUCTS_DISMISS_ERROR,
    };
    expect(dismissFetchProductsError()).to.deep.equal(expectedAction);
  });

  it('handles action type MENU_FETCH_PRODUCTS_BEGIN correctly', () => {
    const prevState = { fetchProductsPending: false };
    const state = reducer(
      prevState,
      { type: MENU_FETCH_PRODUCTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchProductsPending).to.be.true;
  });

  it('handles action type MENU_FETCH_PRODUCTS_SUCCESS correctly', () => {
    const prevState = { fetchProductsPending: true };
    const state = reducer(
      prevState,
      { type: MENU_FETCH_PRODUCTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchProductsPending).to.be.false;
  });

  it('handles action type MENU_FETCH_PRODUCTS_FAILURE correctly', () => {
    const prevState = { fetchProductsPending: true };
    const state = reducer(
      prevState,
      { type: MENU_FETCH_PRODUCTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchProductsPending).to.be.false;
    expect(state.fetchProductsError).to.exist;
  });

  it('handles action type MENU_FETCH_PRODUCTS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchProductsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MENU_FETCH_PRODUCTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchProductsError).to.be.null;
  });
});
