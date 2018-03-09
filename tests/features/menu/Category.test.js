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
            id: 'id1',
            _id: 'id1',
            categories: ['thetestcategory', 'anothercategory'],
            name: 'a product id1',
            price: 1000,
            type: 'product',
            stock: 1000,
          },
          id2: {
            id: 'id2',
            _id: 'id2',
            categories: ['thetestcategory', 'anothercategory'],
            name: 'a product id2',
            price: 500,
            type: 'product',
            stock: 500,
          },
          id3: {
            id: 'id3',
            _id: 'id3',
            categories: ['notthetestcategory', 'anothercategory'],
            name: 'a product id3',
            price: 500,
            type: 'product',
            stock: 500,
          }
        }
      },
      actions: {
        fetchProducts: () => ({}),
      },
      match: { params: { cat: 'thetestcategory' } }
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
