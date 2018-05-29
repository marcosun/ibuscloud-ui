import React from 'react';
import {
  number,
  bool,
  object,
  node,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

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
      width: 716, // Screen width minus drawer width minus margin, 1024 - 260 - 24 * 2
      margin: '0 24px',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    expandedContent: {
      width: 910, // Screen width minus drawer width minus margin, 1024 - 66 - 24 * 2
      margin: '0 24px',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  '@media (min-width: 1024px)': {
    content: { // Fixed width with flexible margin
      margin: '0 auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    expandedContent: { // Fixed width with flexible margin
      margin: '0 auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  '@media (min-width: 1120px)': {
    content: { // Fixed margin with flexible width
      width: 'auto',
      margin: '0 72px',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    expandedContent: { // Fixed margin with flexible width
      width: 'auto',
      margin: '0 72px',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  '@media (min-width: 1730px)': {
    expandedContent: { // Fixed width with flexible margin
      width: 1520,
      margin: '0 auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  '@media (min-width: 1924px)': {
    content: { // Fixed width with flexible margin
      width: 1520,
      margin: '0 auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: 30,
  },
});

/**
 * This component provides an area for the page to display.
 * @param {Number} [props.marginLeft=0] - Margin left
 * @param {Boolean} [props.isExpanded=false] - Expand status
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
        className={classNames({
          [classes.root]: !isExpanded,
          [classes.expanded]: isExpanded,
        })}
        style={{marginLeft}}
      >
        <div className={classNames({
          [classes.content]: !isExpanded,
          [classes.expandedContent]: isExpanded,
        })}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </main>
    );
  }
}

export default Main;
