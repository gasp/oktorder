import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ProductButton from '../common/ProductButton';

export class Category extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    // there must be a `cat` param
    // otherwise the router should not route to here
    match: PropTypes.shape({
      params: PropTypes.shape({
        cat: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { cat } = this.props.match.params;
    this.props.actions.fetchProducts({ cat });
  }

  renderProducts() {
    const a = this.props.menu.products;
    console.log(a);
    const products = _.sortBy(this.props.menu.products, [o => (o.value.name)]);

    return _.map(products, ({ value }) => {
      if (value.categories && value.categories.indexOf(this.props.match.params.cat) < 0) {
        return '';
      }
      const v = value;
      // eslint-disable-next-line
      const key = value['_id'];
      // v.add = this.props.someAction: add
      // v.rem = this.props.someAction: rem
      v.add = () => (null);
      v.rem = () => (null);
      return <ProductButton {...v} key={key} />;
    });
  }

  render() {
    return (
      <div className="menu-category">
        {this.renderProducts()}
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
)(Category);
