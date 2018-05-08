import React from 'react';
import {
  number,
  bool,
  object,
  func,
} from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {default as MuiAppBar} from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import TextField from 'material-ui/TextField';

const styles = (theme) => ({
  appBarExpanded: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShrinked: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchIcon: {
    width: 16,
    height: 16,
    fontSize: 16,
  },
  searchInput: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchInputOpen: {
    width: 170,
  },
  searchInputClose: {
    width: 0,
  },
  toggleIcon: {
    width: 17,
    height: 17,
    fontSize: 17,
  },
  toggleNormalPosition: {
    transform: 'rotate3d(0, 1, 0, 180deg)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toggleFlipPosition: {
    transform: 'rotate3d(0, 1, 0, 0deg)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  whiteSpace: {
    flex: 1,
  },
});

/**
 * AppBar provides a clickable icon to toggle expand status.
 * AppBar expands or shrinks according to isExpanded and expandedOffsetWidth.
 * @param {Number} [props.expandedOffsetWidth=0] - Expanded offset width in pixel.
 * @param {Number} [props.shrinkedOffsetWidth=0] - Shrinked offset width in pixel.
 * @param {Boolean} [props.isExpanded=true] - Expand status
 * @param {Function} [props.onExpandToggle] - Expand status change callback
 */
@withStyles(styles, {name: 'IBusUiAppBar'})
class AppBar extends React.Component {
  static propTypes = {
    classes: object,
    expandedOffsetWidth: number,
    shrinkedOffsetWidth: number,
    isExpanded: bool,
    onExpandToggle: func,
  };

  static defaultProps = {
    expandedOffsetWidth: 0,
    shrinkedOffsetWidth: 0,
    isExpanded: true,
  };

  state = {
    isSearchInputVisible: false,
    searchInputValue: '', // Search input is a controlled TextField component
  };

  /**
   * Call props.onExpandToggle
   */
  handleExpandToggle() {
    const {
      onExpandToggle,
    } = this.props;

    typeof onExpandToggle === 'function' && onExpandToggle();
  }

  /**
   * Toggle search input visibility and focus search input
   */
  handleSearchIconClick() {
    this.setSearchInputVisibility();
    this.searchInputDom.focus();
  }

  /**
   * Update searchInputValue
   * @param  {Object} event - The event source of the callback
   */
  handleSearchInputChange(event) {
    this.setState({
      ...this.state,
      searchInputValue: event.target.value,
    });
  }

  /**
   * Toggle search input visibility
   */
  setSearchInputVisibility() {
    this.setState({
      ...this.state,
      isSearchInputVisible: !this.state.isSearchInputVisible,
    });
  }

  /**
   * Save ref to searchInputDom
   * @param {Element} element - React element
   */
  setSearchInputDom(element) {
    this.searchInputDom = element;
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      expandedOffsetWidth,
      shrinkedOffsetWidth,
      isExpanded,
    } = this.props;

    const {
      isSearchInputVisible,
      searchInputValue,
    } = this.state;

    return (
      <MuiAppBar
        classes={{
          root: classNames(classes.appBarExpanded, {
            [classes.appBarShrinked]: isExpanded === false,
          }),
        }}
        style={{
          width: isExpanded === true ?
            `calc(100% - ${shrinkedOffsetWidth}px)` :
            `calc(100% - ${expandedOffsetWidth}px)`,
        }}
        color='inherit'
      >
        <Toolbar>
          <IconButton
            className={classNames(classes.toggleNormalPosition, {
              [classes.toggleFlipPosition]: isExpanded === true,
            })}
            onClick={this.handleExpandToggle.bind(this)}
          >
            <SvgIcon classes={{
              root: classes.toggleIcon,
            }}>
              <use href="#icon-icon_menu"></use>
            </SvgIcon>
          </IconButton>
          <div className={classes.whiteSpace}></div>
          <IconButton onClick={this.handleSearchIconClick.bind(this)}>
            <SvgIcon classes={{
              root: classes.searchIcon,
            }}>
              <use href="#icon-icon_search"></use>
            </SvgIcon>
          </IconButton>
          <TextField
            className={classNames(classes.searchInput, {
              [classes.searchInputOpen]: isSearchInputVisible,
              [classes.searchInputClose]: !isSearchInputVisible,
            })}
            placeholder='请输入关键词'
            inputRef={this.setSearchInputDom.bind(this)}
            onBlur={this.setSearchInputVisibility.bind(this)}// reset input value
            value={searchInputValue}
            onChange={this.handleSearchInputChange.bind(this)}
          />
        </Toolbar>
      </MuiAppBar>
    );
  }
}

export default AppBar;
