import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Details } from 'src/features/order/Details';

describe('order/Details', () => {
  it('renders node with correct class name', () => {
    const props = {
      order: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Details {...props} />
    );

    expect(
      renderedComponent.find('.order-details').getElement()
    ).to.exist;
  });
});
