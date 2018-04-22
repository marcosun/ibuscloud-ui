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
        <div className={classes.toolbar}></div>
        {children}
      </main>
    );
  }
}

export default Main;
