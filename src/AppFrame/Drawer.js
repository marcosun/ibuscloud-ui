import React from 'react';
import {
  number,
  bool,
  string,
  object,
  node,
  array,
  shape,
} from 'prop-types';
import classNames from 'classnames';
import jss from 'jss';
import {withStyles} from 'material-ui/styles';
import {default as MuiDrawer} from 'material-ui/Drawer';
import {ListItem} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
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
    flex: 'none', // Does not expand
  },
  logoText: {
    flex: '1 1 50%', // Expand to take all spaces
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: theme.palette.common.white,
  },
});

/**
 * Drawer expands or shrinks according to isOpen and width
 * @param {Number} [width=0] - Drawer width
 * @param {Boolean} [props.isOpen=true] - Drawer open status
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
      icon: node,
    }),
  };

  static defaultProps = {
    width: 0,
    isOpen: true,
    logo: {
      text: '公交云平台',
      icon: (
        <SvgIcon viewBox='-3 -3 24 24'>
          <g transform="translate(-0.035 0)">
            <path style={{fill: '#fff'}} d="M7.728,35.764a.186.186,0,0,1-.056-.2c.028-.112.112-.2.224-.168,3.982,1.458,8.3.28,12.057-1.234.393-.14.757-.308,1.15-.477s.813-.365,1.206-.561c.421-.2.813-.393,1.206-.617s.813-.421,1.206-.673c.393-.224.757-.449,1.122-.7.224-.14.421-.308.617-.449.14-.112.252-.2.393-.308.056-.056.14-.112.2-.168.056-.028.14-.084.2-.112h.028a.027.027,0,0,1,.028.028c0,.028,0,.056-.028.056a3.731,3.731,0,0,1-.393.533,22.743,22.743,0,0,1-8.552,6.029,14.2,14.2,0,0,1-6.617,1.15A6.57,6.57,0,0,1,7.728,35.764Z" transform="translate(-5.487 -21.66)"/>
            <g transform="translate(0.035 0)">
              <path style={{fill: '#fff'}} d="M5.886,10.935h0a7.853,7.853,0,0,1-.393-1.262A11.343,11.343,0,0,1,5.381,8.3,6.108,6.108,0,0,1,6.39,5.047l-.224-.056a.527.527,0,0,1-.308-.841A2.154,2.154,0,0,1,6.5,3.533a.712.712,0,0,1,.533-.056l.5.168a6.511,6.511,0,0,1,.841-.617,1.323,1.323,0,0,1,1.206-.14,4.39,4.39,0,0,1,.785.336c.112.056.168.252.028.308a6.974,6.974,0,0,0-1.009.7L21.7,8.159h.056c.028,0,.028-.056,0-.084C15.111,1.542,8.1-1.374,3.923.617,1.035,2.019-.9,6.925.5,10.178c.757,1.738,3.028,2.327,4.739,2.524a14.694,14.694,0,0,0,1.57.056A11.09,11.09,0,0,1,5.886,10.935Z" transform="translate(-0.035 0)"/>
              <path style={{fill: '#fff'}} d="M40.66,22.376c.056,0,.084.112,0,.14-.336.14-.7.28-1.066.421A75.736,75.736,0,0,1,29.22,26.273c-.5.112-1.037.224-1.542.336a7.754,7.754,0,0,1-.925-1.57,6.027,6.027,0,0,1,.477-5.44l13.347,2.748Z" transform="translate(-18.939 -14.104)"/>
            </g>
          </g>
        </SvgIcon>
      ),
    },
  };

  /**
   * MuiDrawer paper classes must be overwrited by passing paper css property
   * via classes. Therefore, here I am creating a jss style sheet to
   * dynamically change paper width.
   * @param  {[type]} props [description]
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
          <Icon classes={{
            root: classes.logoIcon,
          }}>
            {logo.icon}
          </Icon>
          <Typography className={classes.logoText} variant='subheading'>
            {logo.text}
          </Typography>
        </ListItem>
        <NavList navs={navs} />
      </MuiDrawer>
    );
  }
}

export default Drawer;
