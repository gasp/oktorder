import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Home } from 'src/features/menu/Home';

describe('menu/Home', () => {
  it('renders node with correct class name', () => {
    const props = {
      menu: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Home {...props} />
    );

    expect(
      renderedComponent.find('.menu-home').getElement()
    ).to.exist;
  });
});
