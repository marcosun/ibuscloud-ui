import React from 'react';
import {
  number,
  bool,
  object,
} from 'prop-types';
import classNames from 'classnames';
import jss from 'jss';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';

import NavList from './NavList';

const styles = (theme) => ({
  drawerPaper: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
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
 * @param {Number} [openWidth=0] - Drawer open width
 * @param {Number} [closeWidth=0] - Drawer close width
 * @param {Boolean} [props.isOpen=true] - Drawer open status
 */
@withStyles(styles)
class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    openWidth: number,
    closeWidth: number,
    isOpen: bool,
  };

  static defaultProps = {
    openWidth: 0,
    closeWidth: 0,
    isOpen: true,
  };

  /**
   * MuiDrawer paper classes must be overwrited by passing paper css property
   * via classes. Therefore, here I am creating a jss style sheet to
   * dynamically change paper width.
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);

    this.styleSheet = jss.createStyleSheet({
      drawerWidth: {
        width: (data) => (`${data.width}px`),
      },
    }, {
      link: true,
    }).attach();
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      openWidth,
      closeWidth,
      isOpen,
    } = this.props;

    // Update jss
    this.styleSheet.update({
      width: isOpen === true ? openWidth : closeWidth,
    });

    return (
      <MuiDrawer
        variant='permanent'
        classes={{
          paper: classNames(
            classes.drawerPaper,
            this.styleSheet.classes.drawerWidth,
            {
              [classes.drawerPaperClose]: isOpen === false,
            }
          ),
        }}
        open={isOpen === true}
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
