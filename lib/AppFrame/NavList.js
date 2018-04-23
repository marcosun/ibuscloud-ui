import React from 'react';
import {
  string,
  object,
  shape,
  arrayOf,
} from 'prop-types';
import List from 'material-ui/List';
import {withRouter} from 'react-router';

import NavLink from './NavLink';

/**
 * NavList manages a bunch of NavLinks.
 * NavList tests router path against current location to highlight NavLink.
 * @param {Object[]} [props.navs=[]] - Structured array of objects represents NavList
 * @param {String} props.navs[].text - NavList text content
 * @param {String} props.navs[].path - NavList path address
 */
@withRouter
class NavList extends React.Component {
  static propTypes = {
    location: object,
    navs: arrayOf(shape({
      text: string,
      path: string,
    })),
  };

  static defaultProps = {
    navs: [],
  };

  /**
   * Handle NavLink click
   * @param {Object} nav - Structured object representing clicked NavLink
   */
  handleClick(nav) {
    console.log(nav);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      location,
      navs,
    } = this.props;

    return (
      <List>
        {
          navs.map((nav) => (
            <NavLink
              key={nav.text}
              text={nav.text}
              isActive={
                RegExp(nav.path).test(location.pathname) ? true : false
              }
              onClick={this.handleClick.bind(this, nav)}
            />
          ))
        }
      </List>
    );
  }
}

export default NavList;
