import React from 'react';
import {
  number,
  bool,
  object,
  node,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';

const styles = (theme) => ({
  root: {
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  expanded: {
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '@media (min-width: 0px)': {
    content: {
      width: 1106, // Screen width minus drawer width, 1366 - 260
    },
  },
  '@media (min-width: 1366px)': {
    content: { // Fixed margin with flexible width
      width: 'auto',
      margin: '0 75px',
    },
  },
  '@media (min-width: 1600px)': {
    content: {
      width: 1190, // Screen width minus drawer width minus margin, 1600 - 260 - 75 * 2
      margin: '0 auto',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
});

/**
 * Render page content.
 * This area expands and shrinks according to isExpanded and marginLeft.
 * @param {Number} [marginLeft=0] - Margin left
 * @param {Boolean} [isExpanded=false] - Expand status
 * @param {Component} [props.children] - Child node
 */
@withStyles(styles, {name: 'IBusUiMain'})
class Main extends React.Component {
  static propTypes = {
    classes: object,
    marginLeft: number,
    isExpanded: bool,
    children: node,
  };

  static defaultProps = {
    marginLeft: 0,
    isExpanded: false,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      marginLeft,
      isExpanded,
      children,
    } = this.props;

    return (
      <main
        className={classNames(classes.root, {
          [classes.expanded]: isExpanded,
        })}
        style={{marginLeft}}
      >
        <div className={classes.content}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </main>
    );
  }
}

export default Main;
