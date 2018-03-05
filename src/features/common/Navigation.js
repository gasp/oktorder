/*
 * This is a very simple navigation tree for testing purpose.
 * It groups URLs by features.
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

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
    this.props.go(['/', 'menu', 'orders'][index]);
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{ backgroundColor: '#fff' }}>
          {/* icon is a map */}
          <BottomNavigationItem
            label="Tables"
            icon={recentsIcon}
            onClick={() => this.select(0)}
          />
          {/* icon is a beer */}
          <BottomNavigationItem
            label="Menu"
            icon={favoritesIcon}
            onClick={() => this.select(1)}
          />
          {/* icon is un plateau avec un verre et une assiette */}
          <BottomNavigationItem
            label="Orders"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
