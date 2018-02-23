import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProductButton from 'src/common/atoms/ProductButton';

describe('components/atom/ProductButton', () => {
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
      <SimpleNav routes={routes} />
    );

    expect(
      comp.find('.product-button').getElement()
    ).to.exist;
    expect(
      comp.find('button').length
    ).to.equal(2);
  });
});
