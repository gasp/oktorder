import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Current } from 'src/features/order/Current';

describe('order/Current', () => {
  it('renders node with correct class name', () => {
    const props = {
      order: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Current {...props} />
    );

    expect(
      renderedComponent.find('.order-current').getElement()
    ).to.exist;
  });
});
