import React from 'react';
import {
  bool,
  string,
  object,
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

@withStyles(styles)
/**
 * NavLink
 * @param {string} text - Text content to show as a NavLink
 * @param {boolean} isActive - If NavLink should be highlighted
 */
export default class NavLink extends React.Component {
  static propTypes = {
    classes: object,
    text: string,
    isActive: bool,
  };

  static defaultProps = {
    text: '',
    isActive: false,
  };

  /**
   * Render
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
