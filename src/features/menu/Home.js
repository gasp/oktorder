import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ProductButton from '../common/ProductButton';


export class Home extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchProducts();
  }

  renderProductsPrime() {
    return _.map(this.props.menu.products, ({ value: { _id, name, price, stock } }) => {
      const availabiltyClass = stock > 10 ? '' : 'danger';
      const v = {
        key: _id,
        name,
        price,
        stock
      };
      return (
        <li key={_id} className={availabiltyClass}>
          {name}, {price / 100} € (stock: {stock})
          <ProductButton {...v} />
        </li>
      );
    });
  }

  render() {
    return (
      <div className="menu-home">
        Page Content: menu/MenuHome
        <button onClick={this.props.actions.fetchProducts}> refresh </button>
        <ul>
          {this.renderProductsPrime()}
          <li>Beer</li>
          <li>Snack</li>
          <li>Food</li>
          <li>Drinks</li>
        </ul>

      </div>

    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    menu: state.menu,
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
)(Home);
