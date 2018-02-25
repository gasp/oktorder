import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Shortcuts } from 'src/features/menu/Shortcuts';

describe('menu/Shortcuts', () => {
  it('renders node with correct class name', () => {
    const props = {
      menu: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Shortcuts {...props} />
    );

    expect(
      renderedComponent.find('.menu-shortcuts').getElement()
    ).to.exist;
  });
});
