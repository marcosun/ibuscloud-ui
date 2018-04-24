import React from 'react';
import {
  number,
  bool,
  object,
  func,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {default as MuiAppBar} from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShrink: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconButton: {
    transform: 'rotate3d(0, 1, 0, 0deg)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconButtonFlip: {
    transform: 'rotate3d(0, 1, 0, 180deg)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  icon: {
    fill: '#999',
  },
});

/**
 * AppBar provides a fixed svg icon to toggle expand status.
 * AppBar expands or shrinks according to isExpanded and expandedOffsetWidth.
 * @param {Number} [expandedOffsetWidth=0] - Expanded offset width in pixel.
 * @param {Number} [shrinkedOffsetWidth=0] - Shrinked offset width in pixel.
 * @param {Boolean} [props.isExpanded=true] - Expand status
 * @param {Function} [props.onExpandToggle] - Expand status change callback
 */
@withStyles(styles, {name: 'IBusUiAppBar'})
class AppBar extends React.Component {
  static propTypes = {
    classes: object,
    expandedOffsetWidth: number,
    shrinkedOffsetWidth: number,
    isExpanded: bool,
    onExpandToggle: func,
  };

  static defaultProps = {
    expandedOffsetWidth: 0,
    shrinkedOffsetWidth: 0,
    isExpanded: true,
  };

  /**
   * Call props.onExpandToggle
   */
  handleExpandToggle() {
    const {
      onExpandToggle,
    } = this.props;

    typeof onExpandToggle === 'function' && onExpandToggle();
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      expandedOffsetWidth,
      shrinkedOffsetWidth,
      isExpanded,
    } = this.props;

    return (
      <MuiAppBar
        classes={{
          root: classNames(classes.appBar, {
            [classes.appBarShrink]: isExpanded === false,
          }),
        }}
        style={{
          width: isExpanded === true ?
            `calc(100% - ${shrinkedOffsetWidth}px)` :
            `calc(100% - ${expandedOffsetWidth}px)`,
        }}
        color='inherit'
      >
        <Toolbar>
          <IconButton
            className={classNames(classes.iconButton, {
              [classes.iconButtonFlip]: isExpanded === true,
            })}
            onClick={this.handleExpandToggle.bind(this)}
          >
            <SvgIcon viewBox='-3 -3 24 24'>
              <path className={classes.icon} d="M-3417.062-5247a.938.938,0,0,1-.938-.938.938.938,0,0,1,.938-.937h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Zm2.554-4.455-3.226-2.81a.357.357,0,0,1-.031-.03.312.312,0,0,1,.031-.441l3.225-2.819a.164.164,0,0,1,.1-.038.156.156,0,0,1,.157.156v5.866a.156.156,0,0,1-.04.1.155.155,0,0,1-.117.053A.155.155,0,0,1-3414.508-5251.454Zm3.7-2.109a.937.937,0,0,1-.937-.937.937.937,0,0,1,.938-.937h9.375a.938.938,0,0,1,.938.937.938.938,0,0,1-.937.938Zm-6.25-6.562a.938.938,0,0,1-.938-.937.938.938,0,0,1,.938-.938h15.625a.938.938,0,0,1,.938.938.938.938,0,0,1-.937.938Z" transform="translate(3418 5262)"/>
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    );
  }
}

export default AppBar;
