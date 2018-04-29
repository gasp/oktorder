/*
 * This is a very simple navigation tree for testing purpose.
 * It groups URLs by features.
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconList from 'material-ui/svg-icons/action/list';
import IconPaste from 'material-ui/svg-icons/content/content-paste';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// import IconPayment from 'material-ui/svg-icons/action/payment';

const tablesIcon = <IconLocationOn />;
const menuIcon = <IconList />;
const orderIcon = <IconPaste />;


export default class Navigation extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    go: PropTypes.func.isRequired,
  };

  state = {
    selectedIndex: 0,
  };

  componentWillMount() {
    this.setState({ selectedIndex: this.props.routes[0].path.indexOf('/', 'menu', 'orders') });
  }

  select = (index) => {
    this.setState({ selectedIndex: index });
    this.props.go(['/', '/menu', '/order'][index]);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{ backgroundColor: '#fff' }}>
          {/* icon is a map */}
          <BottomNavigationItem
            label="Tables"
            icon={tablesIcon}
            onClick={() => this.select(0)}
          />
          {/* icon is a beer */}
          <BottomNavigationItem
            label="Menu"
            icon={menuIcon}
            onClick={() => this.select(1)}
          />
          {/* icon is un plateau avec un verre et une assiette */}
          <BottomNavigationItem
            label="Orders"
            icon={orderIcon}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
