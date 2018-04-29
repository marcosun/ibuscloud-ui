import React from 'react';
import {
  number,
  bool,
  string,
  object,
  element,
  array,
  shape,
} from 'prop-types';
import classNames from 'classnames';
import jss from 'jss';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import {ListItem, ListItemText} from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';

import NavList from './NavList';

const styles = (theme) => ({
  drawerPaper: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    // Has the same height as AppBar
    ...theme.mixins.toolbar,
  },
  logoIcon: {
    width: 22,
    height: 22,
    fontSize: 22,
  },
  logoText: {
    overflow: 'hidden',
    fontWeight: 800,
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
  },
});

/**
 * Drawer can be toggled between expanded and shrinked status changing two
 * properties: isOpen and width
 * @param {number} [width=0] - Drawer width
 * @param {boolean} [props.isOpen=true] - Drawer open status
 * @param {Object[]} props.navs - Structured array of objects represents NavList.
 * See {@link NavList}
 * @param {Object} [props.logo] - Contains logo icon and logo text
 * @param {string} [props.logo.text=公交云平台] - Logo text
 * @param {Element} [props.logo.icon=公交云logo] - Svg logo icon
 */
@withStyles(styles, {name: 'IBusUiDrawer'})
class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    width: number,
    isOpen: bool,
    navs: array,
    logo: shape({
      text: string,
      icon: element,
    }),
  };

  static defaultProps = {
    width: 0,
    isOpen: true,
    logo: {
      text: '公交云平台',
      icon: <use href="#icon-logo_gjy"></use>,
    },
  };

  /**
   * MuiDrawer paper classes must be overwrited by passing paper css property
   * via classes. Therefore, here I am creating a jss style sheet to
   * dynamically change paper width.
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.styleSheet = jss.createStyleSheet({
      drawerWidth: {
        width: (data) => (`${data.width}px`),
      },
    }, {
      link: true,
    }).attach();
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      width,
      isOpen,
      navs,
      logo,
    } = this.props;

    // Update jss
    this.styleSheet.update({width});

    return (
      <MuiDrawer
        variant='permanent'
        classes={{
          paper: classNames(
            classes.drawerPaper,
            this.styleSheet.classes.drawerWidth,
            {
              [classes.drawerPaperClose]: isOpen === false,
            }
          ),
        }}
        open={isOpen === true}
      >
        <ListItem
          className={classes.logo}
          component='div'
        >
          <SvgIcon classes={{
            root: classes.logoIcon,
          }}>
            {logo.icon}
          </SvgIcon>
          <ListItemText classes={{
              secondary: classes.logoText,
            }}
            secondary={logo.text}
          />
        </ListItem>
        <NavList navs={navs} />
      </MuiDrawer>
    );
  }
}

export default Drawer;
