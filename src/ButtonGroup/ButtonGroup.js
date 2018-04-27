import React from 'react';
import {
  bool,
  shape,
  func,
  string,
  arrayOf,
  object,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

// import {Defer} from '../Util';

const styles = (theme) => ({
  root: {
    padding: `${theme.spacing.unit}px 0`,
  },
  buttonRoot: {
    margin: `0 ${theme.spacing.unit}px`,
    borderRadius: 15,
  },
  buttonSizeSmall: {
    minHeight: 30,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
    fontSize: theme.typography.body1.fontSize,
  },
});

/**
 * @param {Object} props
 * @param {boolean} [props.isMultiple=true] - Whether to enable multiple select
 * @param {Object[]} [props.buttons] - Button list
 * @param {string} [props.buttons[].id=name] - Button id
 * @param {string} props.buttons[].name - Button name
 * @param {boolean} [props.buttons[].isActive] - Whether to highlight button
 * @param {Object} [props.buttonAll] - Button 'all'
 * @param {string} [props.buttonAll.id=name] - Button 'all' id
 * @param {string} props.buttonAll.name - Button 'all' name
 * @param {boolean} [props.buttonAll.isActive] - Whether to highlight button 'all'
 * @param {function} [props.onSelect] - Select callback
 */
@withStyles(styles, {name: 'IBusUiButtonGroup'})
class ButtonGroup extends React.Component {
  static propTypes = {
    classes: object,
    isMultiple: bool,
    buttons: arrayOf(shape({
      id: string,
      name: string,
      isActive: bool,
    })),
    buttonAll: shape({
      id: string,
      name: string,
      isActive: bool,
    }),
    onSelect: func,
  };

  static defaultProps = {
    isMultiple: false, // Whether to enable multiple select
    buttonAll: {}, // Whether to show button 'all'
  }

  /**
   * Synchronise inner button status with new props
   * @param  {Object} nextProps
   * @param  {Object} prevState
   * @return {Object} - New state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      isMultiple,
      buttons,
      buttonAll,
    } = nextProps;

    const state = {
      // Deep copy to isolate props from mutation
      isMultiple: isMultiple,
      buttons: buttons.map((button) => {
        return {
          ...button,
          // Default to name if omitted
          id: button.id !== void 0 ? button.id : button.name,
          // Default to false if ommited
          isActive: button.isActive === true,
        };
      }),
      buttonAll: {
        ...buttonAll,
        // Default to name if omitted
        id: buttonAll.id !== void 0 ? buttonAll.id : buttonAll.name,
        // Default to false if ommited
        isActive: buttonAll.isActive === true,
        // An indicator whether to show button 'all'
        isFunctioning: buttonAll.name !== void 0,
      },
    };

    // If buttonAll is functioning, must open multiple select feature
    if (state.buttonAll.isFunctioning === true) state.isMultiple = true;

    return state;
  }

  state = {};

  /**
   * Handle button click
   * @param  {Object} button - Button object
   */
  handleClick(button) {
    const {
      isMultiple,
    } = this.state;

    if (isMultiple === true) {
      this.setMultipleActive(button);
    } else {
      if (button.isActive === true) {
        // Button is already highlighted, do nothing
        return;
      } else {
        // Highlight that particular selected button
        this.setSingleActive(button);
      }
    }

    /**
     * Call parent component onSelect handler with clicked button
     * and all selected buttons
     */
    if (typeof this.props.onSelect === 'function') {
      // Wait until this.state has been updated
      setTimeout(() => {
        let clickedButton = {
          name: button.name,
          id: button.id,
        };

        // Find all highlighted buttons
        let selectedButtons = this.state.buttons.filter((button) => {
          return button.isActive === true;
        });
        // Return name and id property only
        selectedButtons = selectedButtons.map((button) => {
          return {
            name: button.name,
            id: button.id,
          };
        });

        this.props.onSelect(clickedButton, selectedButtons);
      });
    }
  }

  /**
   * Handle click logics in the situation where only one button can be highlighted.
   * @param {Object} target - Button object that has been clicked
   */
  setSingleActive(target) {
    let {
      buttons,
    } = this.state;

    this.setState({
      ...this.state,
      buttons: buttons.map((button) => {
        if (target.id !== button.id && button.isActive === false) return button;

        if (target.id !== button.id && button.isActive === true) {
          return {
            ...button,
            isActive: false,
          };
        }

        return {
          ...button,
          isActive: true,
        };
      }),
      // buttons: buttons.map((button) => ({
      //   ...button,
      //   isActive: target.id === button.id ? true : false,
      // })),
    });
  }

  /**
   * Handle click logics in the situation where multiple buttons can be highlighted.
   * @param {Object} target - Button object that has been clicked
   */
  setMultipleActive(target) {
    const {
      buttons,
      buttonAll,
    } = this.state;

    if (buttonAll.id === target.id) { // Click on button 'all'
      // Whether to hightlight or unhighlight all buttons
      const shouldHighlight = !buttonAll.isActive;

      if (shouldHighlight === true) { // Highlight every single buttons
        this.setState({
          ...this.state,
          buttons: buttons.map((button) => ({
            ...button,
            isActive: true,
          })),
          buttonAll: {
            ...buttonAll,
            isActive: true,
          },
        });
      } else { // Unhighlight every single buttons
        this.setState({
          ...this.state,
          buttons: buttons.map((button) => ({
            ...button,
            isActive: false,
          })),
          buttonAll: {
            ...buttonAll,
            isActive: false,
          },
        });
      }
    } else { // Click on a button which is not button 'all'
      // Toggle isActive property of that particular button
      let newState = {
        ...this.state,
        buttons: buttons.map((button) => {
          if (target.id !== button.id) return button;

          return {
            ...button,
            isActive: !button.isActive,
          };
        }),
        // buttons: buttons.map((button) => ({
        //   ...button,
        //   isActive: target.id === button.id
        //     ? !button.isActive
        //     : button.isActive,
        // })),
      };

      if (this.isButtonAllFunctioning() === true) {
        newState = this.synchroniseButtonAll(newState);
      }

      this.setState(newState);
    }
  }

  /**
   * Synchronise button 'all' isActive property when some other buttons are clicked
   * @param  {Object} state - Redux store
   * @return {Object} - New redux store with button 'all' isActive property updated
   */
  synchroniseButtonAll(state) {
    let {
      buttons,
      buttonAll,
    } = state;

    const isAllButtonsActive = buttons.find((button) => {
      return button.isActive === false;
    }) === void 0;

    if (isAllButtonsActive) { // All buttons are highlighted
      // Highlight button 'all'
      return {
        ...state,
        buttonAll: {
          ...buttonAll,
          isActive: true,
        },
      };
    } else { // Some buttons are not highlighted
      // Unhighlight button 'all'
      return {
        ...state,
        buttonAll: {
          ...buttonAll,
          isActive: false,
        },
      };
    }
  }

  /**
   * @return {Boolean} - Whether button 'all' is shown on the screen
   */
  isButtonAllFunctioning() {
    const {
      buttonAll,
    } = this.state;

    return buttonAll.isFunctioning;
  }

  /**
   * Render ButtonGroup component
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    const {
      buttons,
      buttonAll,
    } = this.state;

    const buttonAllElement = (
      <Button
        classes={{
          root: classes.buttonRoot,
          sizeSmall: classes.buttonSizeSmall,
        }}
        variant={buttonAll.isActive === true ? 'raised' : 'flat'}
        size='small'
        color='default'
        onClick={this.handleClick.bind(this, buttonAll)}
      >
        {buttonAll.name}
      </Button>
    );

    return (
      <div className={classes.root}>
        {
          this.isButtonAllFunctioning() === true && buttonAllElement
        }
        {
          buttons.map((button) => (
            <Button
              classes={{
                root: classes.buttonRoot,
                sizeSmall: classes.buttonSizeSmall,
              }}
              key={button.id}
              variant={button.isActive === true ? 'raised' : 'flat'}
              size='small'
              color='default'
              onClick={this.handleClick.bind(this, button)}
            >
              {button.name}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default ButtonGroup;
