import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Shortcuts } from 'src/features/menu/Shortcuts';
import { List, ListItem } from 'material-ui/List';

describe('menu/Shortcuts', () => {
  it('renders node with correct class name', () => {
    const props = {
      menu: {
        products: {
          id1: {
            id: 'id1',
            _id: 'id1',
            categories: ['noprime', 'beer'],
            name: 'a product id1',
            price: 1000,
            type: 'product',
            stock: 1000,
          },
          id2: {
            id: 'id2',
            _id: 'id2',
            categories: ['prime', 'beer'],
            name: 'a product id2',
            price: 500,
            type: 'product',
            stock: 500,
          }
        }
      },
      actions: {
        fetchProducts: () => ({}),
      },
      match: { params: { cat: 'food' } }
    };
    const wrapper = shallow(
      <Shortcuts {...props} />
    );

    expect(
      wrapper.find(List).getElement()
    ).to.exist;
    expect(
      wrapper.find(ListItem)
    ).to.have.length(5);
  });
});
