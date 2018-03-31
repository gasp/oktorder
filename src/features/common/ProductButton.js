import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class Product extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    add: PropTypes.func.isRequired,
    rem: PropTypes.func.isRequired,
    qty: PropTypes.number,
    stock: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  };

  static defaultProps = {
    qty: 0,
  }

  state = {};

  render() {
    if (this.props.stock < 1) {
      return <div>depleted</div>;
    }
    return (
      <ListItem
        key={this.props.id}
        leftAvatar={<Avatar icon={<ContentAdd />} />}
        primaryText={this.props.name}
        secondaryText={`${this.props.qty} × ${this.props.price / 100} €`}
        rightIconButton={<Button icon={<ContentAdd />} />}
      />
    );
  }
}
