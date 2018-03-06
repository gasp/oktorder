import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Category } from 'src/features/menu/Category';
import { List, ListItem } from 'material-ui/List';

describe('menu/Category', () => {
  it('renders node with correct class name', () => {
    const props = {
      menu: {
        products: {
          id1: {
            key: 'food',
            value: {
              _id: 'id1',
              categories: ['food', 'beer'],
              name: 'a product id1',
              price: 1000,
              type: 'product',
              stock: 1000,
            }
          },
          id2: {
            key: 'food',
            value: {
              _id: 'id2',
              categories: ['food', 'beer'],
              name: 'a product id2',
              price: 500,
              type: 'product',
              stock: 500,
            }
          }
        }
      },
      actions: {
        fetchProducts: () => ({}),
      },
      match: { params: { cat: 'food' } }
    };
    const wrapper = shallow(
      <Category {...props} />
    );

    expect(
      wrapper.find(List).getElement()
    ).to.exist;
    expect(
      wrapper.find(ListItem)
    ).to.have.length(2);
  });
});
