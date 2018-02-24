import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/FlatButton';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from './redux/actions';
import ProductButton from '../common/ProductButton';


export class Home extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // default category is prime
    this.props.actions.fetchProducts();
  }

  renderProductsPrime() {
    return _.map(this.props.menu.products, ({ value }) => {
      // filter
      // console.log(value.name, value.categories, value.categories.indexOf('prime'), value.categories.indexOf('prime') < 0);
      if (value.categories && value.categories.indexOf('prime') < 0) {
        return '';
      }
      const v = value;
      // eslint-disable-next-line
      const key = value['_id'];
      // v.add = this.props.someAction: add
      // v.rem = this.props.someAction: rem
      v.add = () => (null);
      v.rem = () => (null);
      // <ProductButton {...v} />
      return (
        <ListItem
          key={key}
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
      <div className="menu-home">
        Page Content: menu/MenuHome
        <button onClick={this.props.actions.fetchProducts}> refresh </button>
        <List>
          <Subheader inset>Shortcuts</Subheader>
          {this.renderProductsPrime()}
          <Divider />
          <Subheader inset>Categories</Subheader>
          <ListItem leftAvatar={<Avatar icon={<FileFolder />} />}>
            <Link to="/menu/category/beer">Beers</Link>
          </ListItem>
          <ListItem leftAvatar={<Avatar icon={<FileFolder />} />}>
            <Link to="/menu/category/snack">Snacks</Link>
          </ListItem>
          <ListItem leftAvatar={<Avatar icon={<FileFolder />} />}>
            <Link to="/menu/category/food">Dishes</Link>
          </ListItem>
          <ListItem leftAvatar={<Avatar icon={<FileFolder />} />}>
            <Link to="/menu/category/drink">Drinks</Link>
          </ListItem>
        </List>
        <RaisedButton label="Default" />
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
