import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../common/Navigation';
import routeConfig from '../../common/routeConfig';
import history from '../../common/history';

// This is the root component of your app. Here ise defined the overall layout
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'No content.',
  };

  go = url => {
    console.log(`should navigate to ${url}`); // should be something like this.props.history.push(url)
    history.push(url);
  }

  render() {
    // Navigation is 56px height
    return (
      <div className="home-app">
        <div className="appContent" style={{ height: `${window.innerHeight - 56}px`, backgroundColor: '#f9f9f9' }}>
          {this.props.children}
        </div>
        <Navigation routes={routeConfig} go={this.go} />
      </div>
    );
  }
}
