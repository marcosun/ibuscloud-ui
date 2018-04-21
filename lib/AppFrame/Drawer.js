import React from 'react';
import {
  bool,
  object,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';

import NavList from './NavList';

// This value should be set to equal to drawerWidth in AppBar
const drawerWidth = '260px';

const styles = (theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: '100px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    // Has the same height as AppBar
    ...theme.mixins.toolbar,
    color: '#FFFFFF',
    // Consider using rem instead of px by configuring theme
    fontSize: '16px',
  },
});

/**
 * Drawer expands or shrinks according to isOpen status
 * @param {Boolean} [props.isOpen=true] - Drawer open status
 */
@withStyles(styles)
class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    isOpen: bool,
  };

  static defaultProps = {
    isOpen: true,
  };

  /**
   * Render
   * @return {Component}
   */
  render() {
    const {
      classes,
      isOpen,
    } = this.props;

    return (
      <MuiDrawer
        variant='permanent'
        classes={{
          paper: classNames(classes.drawerPaper, {
            [classes.drawerPaperClose]: !isOpen,
          }),
        }}
        open={isOpen}
      >
        <Grid
          className={classes.logo}
          alignItems='center'
          container
        >
          公交云平台
        </Grid>
        <NavList />
      </MuiDrawer>
    );
  }
}

export default Drawer;
