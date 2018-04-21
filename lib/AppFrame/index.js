import React from 'react';
import {
  object,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';

import AppBar from './AppBar';
import Drawer from './Drawer';

const styles = (theme) => ({
});

@withStyles(styles)
/**
 * AppFrame controls Drawer and AppBar open status by toggling isOpen property.
 */
export default class AppFrame extends React.Component {
  static propTypes = {
    classes: object,
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
      isOpen,
    } = this.state;

    return (
      <div>
        <AppBar
          isDrawerOpen={isOpen}
          onDrawerToggle={this.handleDrawerToggle.bind(this)}
        />
        <Drawer isOpen={isOpen} />
      </div>
    );
  }
}
