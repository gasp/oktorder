import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Current } from 'src/features/order/Current';

describe('order/Current', () => {
  it('renders node with correct class name', () => {
    const props = {
      order: {},
      actions: {
        fetchOrders: () => undefined,
        createOrder: () => undefined, // FIXME this should disappear
      },
    };
    const wrapper = shallow(
      <Current {...props} />
    );

    expect(
      wrapper.find('.order-current').getElement()
    ).to.exist;
  });
});
