import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Details extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchOrder({ orderId: 'order1' });
  }
  render() {
    console.log(this.props.order);
    return (
      <div className="order-details">
        Page Content: order/Details
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
