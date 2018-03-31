import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import * as actions from './redux/actions';
import AppBar from '../common/AppBar';
import Order from './Order';

const style = {
  floatButton: {
    position: 'absolute',
    bottom: '80px',
    right: '2em',
  }
};

export class Current extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchOrders();
    const payload = {
      type: 'order',
      table: 'table1 this is generated by client',
      waiter: 'Nina',
      created: new Date().toString(),
      updated: new Date().toString(),
      open: true,
      ready: false,
      items: {},
    };
    this.props.actions.createOrder({ payload });
  }

  render() {
    return (
      <div className="order-current">
        <AppBar />
        <Subheader style={{ fontWeight: 'bold' }}>Current</Subheader>
        <Card>
          {_.map(this.props.order.orders, order => (
            <Link to={`/order/details/${order.id}`}>
              <Order {...order} key={order.id}>
                <div>Total price: 99.99 €</div>
              </Order>
            </Link>
          ))}
        </Card>
        <div>
          that is all, do you want to view closed orders ?
        </div>
        <FloatingActionButton style={style.floatButton} onClick={() => console.log('pouet')}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    order: state.order,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Current);
