import React from 'react';
import {
  string,
  object,
  element,
  shape,
  arrayOf,
} from 'prop-types';
import List from '@material-ui/core/List';
import {withRouter, matchPath} from 'react-router';

import NavLink from './NavLink';

/**
 * NavList manages a bunch of {@link NavLink}.
 * NavList tests router path against current location to highlight NavLink.
 * Click on NavLink will redirect to the corresponding address.
 * @param {Object[]} [props.navs=[]] - Structured array of objects represents NavList
 * @param {string} props.navs[].text - NavList text content
 * @param {Element} props.navs[].icon - Svg icon
 * @param {string} props.navs[].path - NavList path address
 */
@withRouter
class NavList extends React.Component {
  static propTypes = {
    location: object,
    history: object,
    navs: arrayOf(shape({
      text: string,
      icon: element,
      path: string,
    })),
  };

  static defaultProps = {
    navs: [],
  };

  /**
   * Redirect to page specified by nav.path.
   * @param {Object} nav - Structured object representing clicked NavLink
   */
  handleClick(nav) {
    const {
      location,
      history,
    } = this.props;

    // Click on NavLink of current page
    if (RegExp(nav.path).test(location.pathname)) return;

    history.push(nav.path);
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
              icon={nav.icon}
              isActive={
                matchPath(location.pathname, {
                  path: nav.path,
                  exact: true,
                }) !== null
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
