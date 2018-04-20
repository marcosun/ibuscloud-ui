import React from 'react';
import {
  object,
} from 'prop-types';
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
      <MuiDrawer
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        open={true}
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
