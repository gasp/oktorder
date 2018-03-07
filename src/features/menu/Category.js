import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// import ProductButton from '../common/ProductButton';
import * as actions from './redux/actions';

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
    const products = _.sortBy(this.props.menu.products, [o => (o.name)]);
    return _.map(products, (product) => {
      if (product.categories && product.categories.indexOf(this.props.match.params.cat) < 0) {
        // ignore products which are not in this category
        return '';
      }
      const v = { ...product };
      // v.add = this.props.someAction: add
      // v.rem = this.props.someAction: rem
      v.add = () => (null);
      v.rem = () => (null);
      // return <ProductButton {...v} key={key} />;
      return (
        <ListItem
          key={v.id}
          leftAvatar={<Avatar icon={<ContentAdd />} />}
          primaryText={v.name}
          secondaryText={`0 × ${v.price / 100} €`}
          rightIconButton={<Button icon={<ContentAdd />} />}
        />
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderProducts()}
      </List>
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
