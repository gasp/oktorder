import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';

export default class Navigation extends PureComponent {
  render() {
    return (
      <AppBar
        title="Orders"
        onLeftIconButtonClick={() => { console.log()('plop'); }}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}
