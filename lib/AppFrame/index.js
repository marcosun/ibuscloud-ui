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
 * AppFrame
 */
export default class AppFrame extends React.Component {
  static propTypes = {
    classes: object,
  };

  /**
   * Render
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div>
        <AppBar />
        <Drawer />
      </div>
    );
  }
}
