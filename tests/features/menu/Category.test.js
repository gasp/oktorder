import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Category } from 'src/features/menu/Category';

describe('menu/Category', () => {
  it('renders node with correct class name', () => {
    const props = {
      menu: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Category {...props} />
    );

    expect(
      renderedComponent.find('.menu-category').getElement()
    ).to.exist;
  });
});
