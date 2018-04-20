import React from 'react';
import {
  object,
  bool,
  func,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {default as MuiAppBar} from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

const drawerWidth = '260px';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
  },
});

@withStyles(styles)
/**
 * AppBar
 */
export default class AppBar extends React.Component {
  static propTypes = {
    classes: object,
    isDrawerOpen: bool,
    onDrawerToggle: func,
  };

  static defaultProps = {
    isDrawerOpen: false,
  };

  /**
   * Call props.onDrawerToggle
   */
  handleDrawerToggle() {
    const {
      onDrawerToggle,
    } = this.props;

    typeof onDrawerToggle === 'function' && onDrawerToggle();
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      isDrawerOpen,
    } = this.props;

    return (
      <MuiAppBar
        classes={{
          root: classNames(classes.appBar, {
            [classes.appBarShift]: isDrawerOpen,
          }),
        }}
        color='inherit'
      >
        <Toolbar>
          <IconButton onClick={this.handleDrawerToggle.bind(this)}>
            <SvgIcon viewBox='-3 -3 24 24'>
              <path style={{fill: '#999'}} d="M-3417.062-5247a.938.938,0,0,1-.938-.938.938.938,0,0,1,.938-.937h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Zm2.554-4.455-3.226-2.81a.357.357,0,0,1-.031-.03.312.312,0,0,1,.031-.441l3.225-2.819a.164.164,0,0,1,.1-.038.156.156,0,0,1,.157.156v5.866a.156.156,0,0,1-.04.1.155.155,0,0,1-.117.053A.155.155,0,0,1-3414.508-5251.454Zm3.7-2.109a.937.937,0,0,1-.937-.937.937.937,0,0,1,.938-.937h9.375a.938.938,0,0,1,.938.937.938.938,0,0,1-.937.938Zm-6.25-6.562a.938.938,0,0,1-.938-.937.938.938,0,0,1,.938-.938h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Z" transform="translate(3418 5262)"/>
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    );
  }
}
