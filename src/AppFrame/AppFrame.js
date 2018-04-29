import React from 'react';
import {
  object,
  array,
  node,
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
 */
class AppFrame extends React.Component {
  static propTypes = {
    classes: object,
    navs: array,
    children: node,
  };

  state = {
    drawerOpenWidth: 260,
    drawerCloseWidth: 68,
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
      navs,
      children,
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
          shrinkedOffsetWidth={drawerCloseWidth}
          isExpanded={!isOpen}
          onExpandToggle={this.handleDrawerToggle.bind(this)}
        />
        <Drawer
          width={isOpen === true ? drawerOpenWidth : drawerCloseWidth}
          isOpen={isOpen}
          navs={navs}
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
