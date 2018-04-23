import React from 'react';
import {
  number,
  bool,
  object,
  array,
} from 'prop-types';
import classNames from 'classnames';
import jss from 'jss';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

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
    paddingLeft: theme.typography.pxToRem(5),
  },
  logoText: {
    color: theme.palette.common.white,
  },
});

/**
 * Drawer expands or shrinks according to isOpen and width
 * @param {Number} [width=0] - Drawer width
 * @param {Boolean} [props.isOpen=true] - Drawer open status
 */
@withStyles(styles, {name: 'IBusUiDrawer'})
class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    width: number,
    isOpen: bool,
    navs: array,
  };

  static defaultProps = {
    width: 0,
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
      width,
      isOpen,
      navs,
    } = this.props;

    // Update jss
    this.styleSheet.update({width});

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
          <Typography className={classes.logoText} variant='subheading'>
            公交云平台
          </Typography>
        </Grid>
        <NavList navs={navs} />
      </MuiDrawer>
    );
  }
}

export default Drawer;
