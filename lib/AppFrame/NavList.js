import React from 'react';
import {
  string,
  shape,
  arrayOf,
} from 'prop-types';
import List from 'material-ui/List';
import {withRouter} from 'react-router';

import NavLink from './NavLink';

@withRouter
/**
 * NavList
 * @param {Object} navs - Structured array of objects representing NavList
 */
export default class NavList extends React.Component {
  static propTypes = {
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
   * Render
   * @return {Component}
   */
  render() {
    const {
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
                RegExp(nav.url).test(window.location.pathname) ? true : false
              }
              onClick={this.handleClick.bind(this, nav)}
            />
          ))
        }
      </List>
    );
  }
}
