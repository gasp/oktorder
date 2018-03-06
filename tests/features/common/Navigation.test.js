import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Navigation } from 'src/features/common';

describe('components/Navigation', () => {
  it('renders node with correct dom structure', () => {
    const routes = [
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
    ];
    const noop = () => undefined;
    const wrapper = shallow(
      <Navigation routes={routes} go={noop} />
    );

    expect(
      wrapper.find(BottomNavigation)
    ).to.have.length(1);
    expect(
      wrapper.find(BottomNavigationItem)
    ).to.have.length(3);
  });
});
