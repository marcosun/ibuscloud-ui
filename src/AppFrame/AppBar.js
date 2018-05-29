import React from 'react';
import {
  number,
  bool,
  object,
  func,
} from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiAppBar from '@material-ui/core/AppBar';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

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
  searchInputContainer: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchInputVisible: {
    width: 170,
  },
  searchInputHidden: {
    width: 0,
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
 * @param {Boolean} [props.isExpanded=true] - Expand status
 * @param {Function} [props.onExpandToggle] - Callback fired when toggle
 * icon is clicked.
 * Signature:
 * function() => void
 * @param {Function} [props.onLogout] - Callback fired when logout
 * button is clicked.
 * Signature:
 * function() => void
 * @param {Function} [props.onSearch] - Callback fired when user clicks enter
 * inside text field.
 * Signature:
 * function(keyword: string, event: object) => void
 * keyword: search input value.
 * event: The event source of the callback.
 * @param {Number} [props.shrinkedOffsetWidth=0] - Shrinked offset width in pixel.
 */
@withStyles(styles, {name: 'IBusUiAppBar'})
class AppBar extends React.Component {
  static propTypes = {
    classes: object,
    expandedOffsetWidth: number,
    isExpanded: bool,
    onExpandToggle: func,
    onLogout: func,
    onSearch: func,
    shrinkedOffsetWidth: number,
  };

  static defaultProps = {
    expandedOffsetWidth: 0,
    isExpanded: true,
    shrinkedOffsetWidth: 0,
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
   * Call props.onLogout.
   */
  handleLogout() {
    const {
      onLogout,
    } = this.props;

    typeof onLogout === 'function' && onLogout();
  }

  /**
   * Hide search input and call props.onSearch function.
   * @param  {Object} event - The event source of the callback
   */
  handleSearch(event) {
    const {
      onSearch,
    } = this.props;

    const {
      searchInputValue: keyword,
    } = this.state;

    event.preventDefault();

    this.hideSearchInput();

    typeof onSearch === 'function' && onSearch(keyword, event);
  }

  /**
   * Toggle search input visibility and focus search input
   */
  handleSearchIconClick() {
    this.setState({
      ...this.state,
      isSearchInputVisible: true,
    });
    this.searchInputDom.focus();
  }

  /**
   * Update search input text field value
   * @param  {Object} event - The event source of the callback
   */
  handleSearchInputChange(event) {
    this.setState({
      ...this.state,
      searchInputValue: event.target.value,
    });
  }

  /**
   * Hide search input and clear input value
   */
  hideSearchInput() {
    this.setState({
      ...this.state,
      isSearchInputVisible: false,
      searchInputValue: '',
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
            <SvgIcon>
              <use xlinkHref="#icon-icon_menu"></use>
            </SvgIcon>
          </IconButton>
          <div className={classes.whiteSpace}></div>
          <IconButton onClick={this.handleSearchIconClick.bind(this)}>
            <SvgIcon>
              <use xlinkHref="#icon-icon_search"></use>
            </SvgIcon>
          </IconButton>
          <form
            /**
             * Initially, I gave the following styles to TextField.
             * But then it came with two compatibility issue on Safari.
             * 1. HTML form element took space even though TextField
             * had zero width.
             * 2. Failed to focus HTML input element when TextField expanded
             * from zero width.
             */
            className={classNames(classes.searchInputContainer, {
              [classes.searchInputVisible]: isSearchInputVisible,
              [classes.searchInputHidden]: !isSearchInputVisible,
            })}
            onSubmit={this.handleSearch.bind(this)}
          >
            <TextField
              placeholder='请输入关键词'
              inputRef={this.setSearchInputDom.bind(this)}
              value={searchInputValue}
              onBlur={this.hideSearchInput.bind(this)}
              onChange={this.handleSearchInputChange.bind(this)}
            />
          </form>
          <Button onClick={this.handleLogout.bind(this)}>退出</Button>
        </Toolbar>
      </MuiAppBar>
    );
  }
}

export default AppBar;
