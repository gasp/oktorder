import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Product from 'src/features/common/Product';

describe('components/Product', () => {
  it('renders a node', () => {
    const props = {
      id: 'id',
      add: () => (null),
      rem: () => (null),
      qty: 999,
      stock: 999,
      price: 999,
      name: 'some name',
      productId: 'productId',
    };

    const comp = shallow(
      <Product {...props} />
    );

    expect(
      comp.length
    ).to.equal(1);
  });
});
