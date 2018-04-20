import React from 'react';
import {
  object,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Drawer from 'material-ui/Drawer';
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
        <AppBar color='inherit'>
          <Toolbar>
            <IconButton>
              <SvgIcon viewBox='-3 -3 24 24'>
                <path style={{fill: '#999'}} d="M-3417.062-5247a.938.938,0,0,1-.938-.938.938.938,0,0,1,.938-.937h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Zm2.554-4.455-3.226-2.81a.357.357,0,0,1-.031-.03.312.312,0,0,1,.031-.441l3.225-2.819a.164.164,0,0,1,.1-.038.156.156,0,0,1,.157.156v5.866a.156.156,0,0,1-.04.1.155.155,0,0,1-.117.053A.155.155,0,0,1-3414.508-5251.454Zm3.7-2.109a.937.937,0,0,1-.937-.937.937.937,0,0,1,.938-.937h9.375a.938.938,0,0,1,.938.937.938.938,0,0,1-.937.938Zm-6.25-6.562a.938.938,0,0,1-.938-.937.938.938,0,0,1,.938-.938h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Z" transform="translate(3418 5262)"/>
              </SvgIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
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
        </Drawer>
      </div>
    );
  }
}
