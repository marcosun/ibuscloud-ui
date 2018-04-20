import React from 'react';
import {
  bool,
  object,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

const drawerWidth = '260px';

const styles = (theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  drawerPaperClose: {
    width: '100px',
  },
  logo: {
    ...theme.mixins.toolbar,
    color: '#FFFFFF',
    // Consider using rem instead of px by configuring theme
    fontSize: '16px',
  },
  navLink: {
    justifyContent: 'flex-start',
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    borderRadius: '0',
    boxShadow: 'none',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(59, 134, 255, 0.1)',
    },
  },
});

@withStyles(styles)
/**
 * Drawer
 */
export default class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    isOpen: bool,
  };

  static defaultProps = {
    isOpen: false,
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
        <Button
          classes={{
            root: classes.navLink,
          }}
          fullWidth
          size='large'
          variant='raised'
        >
          线路管理
        </Button>
      </MuiDrawer>
    );
  }
}
