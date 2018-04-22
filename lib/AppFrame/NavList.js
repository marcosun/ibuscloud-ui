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
 * NavList tests router url against current location to highlight NavLink.
 * @param {Object[]} [props.navs=[]] - Structured array of objects represents NavList
 * @param {String} props.navs[].text - NavList text content
 * @param {String} props.navs[].url - NavList url address
 */
@withRouter
class NavList extends React.Component {
  static propTypes = {
    location: object,
    navs: arrayOf(shape({
      text: string,
      url: string,
    })),
  };

  static defaultProps = {
    navs: [{
      text: '线路管理',
      url: 'appFrame',
    }, {
      text: '站点管理',
      url: 'stops',
    }],
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
                RegExp(nav.url).test(location.pathname) ? true : false
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
