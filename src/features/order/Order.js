
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const OrderItems = ({ orderid, items }) => (Object.keys(items).map(i => (
  <ListItem key={`item_${i}${orderid}-${items[i].productid}`}>
    { items[i].productid } x { items[i].qty }
  </ListItem>
)));

export default class Order extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired, // TODO this will be a schema
    open: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    waiter: PropTypes.string.isRequired, // TODO this will be a schema
    items: PropTypes.any,
  };

  static defaultProps = {
    items: {}
  }

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
          <OrderItems items={this.props.items} orderid={this.props.id} />
        </List>
        <Divider />
      </div>
    );
  }
}
