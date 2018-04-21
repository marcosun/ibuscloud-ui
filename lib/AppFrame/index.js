import React from 'react';
import {
  object,
  node,
} from 'prop-types';

import AppBar from './AppBar';
import Drawer from './Drawer';
import Main from './Main';

/**
 * AppFrame controls Drawer, AppBar and Main open status
 * by toggling isOpen property.
 * @param {Component} [props.children] - Node that will be placed on the
 * main screen area
 */
class AppFrame extends React.Component {
  static propTypes = {
    classes: object,
    children: node,
  };

  state = {
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
    } = this.props;

    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <AppBar
          isDrawerOpen={isOpen}
          onDrawerToggle={this.handleDrawerToggle.bind(this)}
        />
        <Drawer isOpen={isOpen} />
        <Main isExpanded={!isOpen}>{children}</Main>
      </div>
    );
  }
}

export default AppFrame;
