import React from 'react';
import {
  bool,
  string,
  object,
  func,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {ListItem, ListItemText} from 'material-ui/List';
import color from 'color';

const styles = (theme) => ({
  navLinkButton: {
    borderLeft: `${theme.typography.pxToRem(5)} solid transparent`,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: `${color(theme.palette.primary.main).alpha(0.1)}`,
    },
  },
  activeNavLink: {
    borderLeft: `${theme.typography.pxToRem(5)} solid ${theme.palette.primary.main}`,
    backgroundColor: `${color(theme.palette.primary.main).alpha(0.1)}`,
  },
  navLinkText: {
    overflow: 'hidden',
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
  },
});

/**
 * Selected NavLink has a 5px wide left border with colour primary.
 * Selected NavLink and hovered NavLink have background colour primary
 * with 10% transparency.
 * @param {String} [props.text=''] - Text content to show as a NavLink
 * @param {Boolean} [props.isActive=false] - If NavLink should be highlighted
 * @param {Function} [props.onClick] - NavLink click callback
 */
@withStyles(styles, {name: 'IBusUiNavLink'})
class NavLink extends React.Component {
  static propTypes = {
    classes: object,
    text: string,
    isActive: bool,
    onClick: func,
  };

  static defaultProps = {
    text: '',
    isActive: false,
  };

  /**
   * Once NavLink is clicked, propagate to parent component.
   * @param {Object} e - onClick parameter
   */
  handleClick(e) {
    typeof this.props.onClick === 'function' && this.props.onClick(e);
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      text,
      isActive,
    } = this.props;

    return (
      <ListItem
        classes={{
          root: classNames(classes.navLinkButton, {
            [classes.activeNavLink]: isActive,
          }),
        }}
        button
        onClick={this.handleClick.bind(this)}
      >
      <ListItemText
        classes={{
          secondary: classes.navLinkText,
        }}
        secondary={text}
      />
      </ListItem>
    );
  }
}

export default NavLink;
