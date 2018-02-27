import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Navigation } from 'src/features/common';

describe('components/SimpleNav', () => {
  it('renders node with correct dom structure', () => {
    const routes = [{
      childRoutes: [
        { path: '/', childRoutes: [{ path: 'abc' }] },
        { path: '/root', autoIndexRoute: true },
        { path: 'relative-path', name: 'Link Name' },
        {
          path: 'sub-links',
          childRoutes: [
            { path: 'sub-link' },
          ],
        },
        { path: '*' },
      ],
    }];
    const comp = shallow(
      <Navigation routes={routes} />
    );

    expect(
      comp.find('.common-navigation').getElement()
    ).to.exist;
    expect(
      comp.find('li').length
    ).to.equal(8);
  });
});
