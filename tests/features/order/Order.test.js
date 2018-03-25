import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Order from 'src/features/order/Order';

describe('components/Order', () => {
  it('renders node with correct dom structure', () => {
    const props = {
      id: 'randomsha',
      table: 'this is the table name', // TODO this may change
      waiter: 'Nina', // TODO this may change
      created: 'Thu Mar 15 2018 16:22:21 GMT+0100 (CET)',
      updated: 'Thu Mar 15 2018 16:22:21 GMT+0100 (CET)',
      open: true,
      paid: false,
      ready: false,
    };
    const wrapper = shallow(
      <Order {...props} />
    );

    expect(
      wrapper.find('.order-order').getElement()
    ).to.exist;
  });
});
