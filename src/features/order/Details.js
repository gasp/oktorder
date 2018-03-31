import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from './redux/actions';

import Order from './Order';
import Product from '../common/ProductButton';

const ProductName = ({ productid, products }) => {
  console.log('prodictname products', products)
  if (typeof products === 'undefined') return `id(undefined) ${productid}`;
  if (typeof products[productid] === 'undefined') return `id ${productid}`;
  return `name ${products[productid].name}`;
};


const OrderItems = ({ orderid, items, products }) => (Object.keys(items).map(i => (
  <Product
    id={`product_${i}${orderid}-${items[i].productid}`}
    key={`item_${i}${orderid}-${items[i].productid}`}
    name={ProductName({ productid: items[i].productid, products })}
    qty={items[i].qty}
    stock={1}
    price={1000}
    add={() => (null)}
    rem={() => (null)}
  />
)));


export class Details extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchOrder({ orderId: this.props.match.params.orderId });
  }
  render() {
    // console.log(this.props.order.orders)
    // console.log(this.props.menu.products)
    const { orderId } = this.props.match.params;
    if (!this.props.order.orders) this.props.order.orders = {};
    if (!this.props.order.orders[orderId]) {
      return (<div>loading...</div>);
    }
    const orderItems = this.props.order.orders[orderId].items;
    console.log('products',this.props.menu.products);
    return (
      <div className="order-details">
        <p style={{ margin: '1em' }}><Link to="/order/">&lt; back</Link></p>
        Page Content: order/Details fetching order
        &nbsp;<b>&quot;{ orderId }&quot;</b> :-)
        <Order {...this.props.order.orders[orderId]} key={orderId}>
          <OrderItems products={this.props.menu.products} orderid={orderId} items={orderItems} />
        </Order>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    menu: state.menu,
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
