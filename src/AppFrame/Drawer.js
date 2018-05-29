import React from 'react';
import {
  array,
  bool,
  element,
  instanceOf,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import classNames from 'classnames';
import jss from 'jss';
import {withStyles} from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRouter} from 'react-router';

import NavList from './NavList';
import doesPathMatch from '../Util/doesPathMatch';

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
    paddingLeft: 5,
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
 * @param {boolean} [props.isOpen=true] - Drawer open status
 * @param {Object} [props.logo] - Contains logo icon and logo text
 * @param {Element} [props.logo.icon=ibuscloud logo] - Svg logo icon
 * @param {string} [props.logo.text=公交云平台] - Logo text
 * @param {Object[]} props.navs - Structured array of objects represents NavList.
 * See {@link NavList}
 * @param {(number|RegExp|string)} [props.rootUrl] - App root url.
 * @param {number} [props.width=0] - Drawer width
 */
@withRouter
@withStyles(styles, {name: 'IBusUiDrawer'})
class Drawer extends React.Component {
  static propTypes = {
    classes: object,
    history: object,
    isOpen: bool,
    location: object,
    logo: shape({
      icon: element,
      text: string,
    }),
    navs: array,
    rootUrl: oneOfType([number, instanceOf(RegExp), string]),
    width: number,
  };

  static defaultProps = {
    isOpen: true,
    logo: {
      icon: <use xlinkHref="#icon-logo_gjy"></use>,
      text: '公交云平台',
    },
    width: 0,
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
   * Click on logo will redirect to root url.
   */
  handleClick() {
    const {
      history,
      location,
      rootUrl,
    } = this.props;

    const preventRedirect = doesPathMatch(rootUrl, location.pathname);

    // Redirect only if currnt path does not match rootUrl
    if (preventRedirect || rootUrl === void 0) return;

    history.push(rootUrl);
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
          button
          className={classes.logo}
          onClick={this.handleClick.bind(this)}
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
