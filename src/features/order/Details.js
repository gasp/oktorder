import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import Order from './Order';

export class Details extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchOrder({ orderId: this.props.match.params.orderId });
  }
  render() {
    // console.log(this.props.order.orders)
    const { orderId } = this.props.match.params;
    if (!this.props.order.orders) this.props.order.orders = {};
    if (!this.props.order.orders[orderId]) {
      return (<div>loading...</div>);
    }
    return (
      <div className="order-details">
        Page Content: order/Details fetching order
        &nbsp;<b>&quot;{ this.props.match.params.orderId }&quot;</b> :-)
        <Order {...this.props.order.orders[orderId]} key={orderId} />
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
)(Details);
