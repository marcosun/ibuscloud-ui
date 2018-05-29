import React from 'react';
import {
  arrayOf,
  element,
  instanceOf,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import List from '@material-ui/core/List';
import {withRouter} from 'react-router';

import NavLink from './NavLink';
import doesPathMatch from '../Util/doesPathMatch';

/**
 * NavList manages a bunch of {@link NavLink}.
 * NavList tests router path against current location to highlight NavLink.
 * Click on NavLink will redirect to the corresponding address.
 * @param {Object[]} [props.navs=[]] - Structured array of objects
 * represents NavList
 * @param {Element} props.navs[].icon - Svg icon
 * @param {(number|RegExp|string)} props.navs[].matchPath - RegExp that will be
 * matched against current path.
 * Match against current location.path to highlight NavLink.
 * @param {string} props.navs[].path - NavList redirect to address.
 * @param {string} props.navs[].text - NavList text content.
 */
@withRouter
class NavList extends React.Component {
  static propTypes = {
    location: object,
    history: object,
    navs: arrayOf(shape({
      icon: element.isRequired,
      matchPath: oneOfType([number, instanceOf(RegExp), string]).isRequired,
      path: string.isRequired,
      text: string.isRequired,
    })),
  };

  static defaultProps = {
    navs: [],
  };

  /**
   * Redirect to page specified by nav.path.
   * @param {string} path - Path to redirect to.
   * @param {boolean} preventRedirect - Will not redirect if value is true.
   */
  handleClick(path, preventRedirect) {
    const {
      history,
    } = this.props;

    // Redirect only if currnt path does not match matchPath
    if (preventRedirect) return;

    history.push(path);
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
          navs.map((nav) => {
            const isOnCurrentPage = doesPathMatch(nav.matchPath, location.pathname);

            return (
              <NavLink
                key={nav.text}
                text={nav.text}
                icon={nav.icon}
                isActive={isOnCurrentPage}
                onClick={this.handleClick.bind(this, nav.path, isOnCurrentPage)}
              />
            );
          })
        }
      </List>
    );
  }
}

export default NavList;
