import React from 'react';
import {
  array,
  func,
  instanceOf,
  node,
  number,
  object,
  oneOfType,
  string,
} from 'prop-types';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Main from './Main';

/**
 * AppFrame provides an AppBar on the top, a navigational sidebar on the left,
 * and an area for the page to display.
 * Sidebar can be toggled to be expanded or shrinked by clicking an icon on the
 * AppBar.
 * @param {Component} [props.children] - Node that will be placed on the
 * main screen area
 * @param {Object[]} props.navs - Structured array of objects represents NavList.
 * See {@link NavList}
 * @param {Function} [props.onSearch] - Callback fired when user clicks enter
 * inside text field. See {@link AppBar}
 * @param {(number|RegExp|string)} [props.rootUrl] - App root url.
 */
class AppFrame extends React.Component {
  static propTypes = {
    children: node,
    classes: object,
    navs: array,
    onSearch: func,
    rootUrl: oneOfType([number, instanceOf(RegExp), string]),
  };

  state = {
    drawerOpenWidth: 260,
    drawerCloseWidth: 78,
    isOpen: true,
  };

  /**
   * Toggle isOpen property to open or close Drawer
   */
  handleDrawerToggle() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      children,
      navs,
      onSearch,
      rootUrl,
    } = this.props;

    const {
      drawerOpenWidth,
      drawerCloseWidth,
      isOpen,
    } = this.state;

    return (
      <div>
        <AppBar
          expandedOffsetWidth={drawerOpenWidth}
          isExpanded={!isOpen}
          onExpandToggle={this.handleDrawerToggle.bind(this)}
          onSearch={onSearch}
          shrinkedOffsetWidth={drawerCloseWidth}
        />
        <Drawer
          width={isOpen === true ? drawerOpenWidth : drawerCloseWidth}
          isOpen={isOpen}
          navs={navs}
          rootUrl={rootUrl}
        />
        <Main
          marginLeft={isOpen === true ? drawerOpenWidth : drawerCloseWidth}
          isExpanded={!isOpen}
        >
          {children}
        </Main>
      </div>
    );
  }
}

export default AppFrame;
