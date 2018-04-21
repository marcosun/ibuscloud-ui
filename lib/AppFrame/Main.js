import React from 'react';
import {
  bool,
  object,
  node,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';

// This value should be set to equal to drawerWidth in Drawer
const drawerWidth = '260px';
const drawerCloseWidth = '100px';

const styles = (theme) => ({
  root: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  expanded: {
    marginLeft: drawerCloseWidth,
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
});

/**
 * Render main content. Area expands and shrinks according to isExpanded status.
 * @param {Boolean} [isExpanded=false] - Main expand status
 * @param {Component} [props.children] - Child node
 */
@withStyles(styles)
class Main extends React.Component {
  static propTypes = {
    classes: object,
    isExpanded: bool,
    children: node,
  };

  static defaultProps = {
    isExpanded: false,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      isExpanded,
      children,
    } = this.props;

    return (
      <main className={classNames(classes.root, {
        [classes.expanded]: isExpanded,
      })}>
        <div className={classes.toolbar}></div>
        {children}
      </main>
    );
  }
}

export default Main;
