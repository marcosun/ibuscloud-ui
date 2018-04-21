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

const styles = (theme) => ({
  navLinkButton: {
    borderLeft: '5px solid transparent',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(59, 134, 255, 0.1)',
    },
  },
  activeNavLink: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    backgroundColor: 'rgba(59, 134, 255, 0.1)',
  },
  navLinkText: {
    overflow: 'hidden',
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
  },
});

/**
 * NavLink
 * @param {String} [props.text=''] - Text content to show as a NavLink
 * @param {Boolean} [props.isActive=false] - If NavLink should be highlighted
 * @param {Function} [props.onClick] - NavLink click callback
 */
@withStyles(styles)
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
          primary: classes.navLinkText,
        }}
        primary={text}
      />
      </ListItem>
    );
  }
}

export default NavLink;
