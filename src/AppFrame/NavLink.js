import React from 'react';
import {
  bool,
  string,
  object,
  element,
  func,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import color from 'color';

const styles = (theme) => ({
  navLinkButton: {
    paddingRight: 16,
    paddingLeft: 16,
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
  navLinkTextContainer: {
    padding: '0 10px',
  },
  navLinkText: {
    overflow: 'hidden',
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
  },
});

/**
 * NavLink provides a navigational link for {@link NavList} with an icon
 * followed by the link text.
 * NavLink can be highlighted by toggling isActive.
 * @param {Element} props.icon - Svg icon
 * @param {string} props.text - Text content to show as a NavLink
 * @param {boolean} [props.isActive=false] - If NavLink should be highlighted
 * @param {Function} [props.onClick] - NavLink click callback
 */
@withStyles(styles, {name: 'IBusUiNavLink'})
class NavLink extends React.Component {
  static propTypes = {
    classes: object,
    icon: element.isRequired,
    text: string.isRequired,
    isActive: bool,
    onClick: func,
  };

  static defaultProps = {
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
      icon,
      isActive,
    } = this.props;

    return (
      <ListItem
        button
        classes={{
          root: classNames(classes.navLinkButton, {
            [classes.activeNavLink]: isActive,
          }),
        }}
        onClick={this.handleClick.bind(this)}
      >
        <SvgIcon>{icon}</SvgIcon>
        <ListItemText
          classes={{
            root: classes.navLinkTextContainer,
            secondary: classes.navLinkText,
          }}
          secondary={text}
        />
      </ListItem>
    );
  }
}

export default NavLink;
