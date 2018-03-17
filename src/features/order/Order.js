
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class Order extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired, // TODO thiw will be a schema
    open: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    waiter: PropTypes.string.isRequired, // TODO thiw will be a schema
  };

  state = {};

  componentWillMount() {
    this.setState({});
  }
  render() {
    const style = {
      backgroundColor: this.props.open ? '#fff' : '#f00',
      // padding: '1em'
    };
    return (
      <div className="order-order" key={this.props.id} style={style}>
        <Subheader>{this.props.table}</Subheader>
        <div>created {this.props.created}</div>
        <div>updated {this.props.updated}</div>
        <div>waiter: {this.props.waiter}</div>
        <div>ready: {this.props.ready ? 'ready' : 'not ready'}</div>
        <List>
          <ListItem key="a">some sample &quot;a&quot; order here</ListItem>
          <ListItem key="b">some sample &quot;b&quot; order here</ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}
