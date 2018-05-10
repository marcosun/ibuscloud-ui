import React from 'react';
import {
  bool,
  number,
  string,
  object,
  func,
  shape,
  arrayOf,
  oneOfType,
} from 'prop-types';

import ButtonGroupDummy from '../ButtonGroupDummy';

/**
 * @param {Object} props
 * @param {boolean} [props.isMultiple=true] - Whether to enable multiple select
 * @param {Object[]} [props.buttons] - Button list
 * @param {(string|number)} [props.buttons[].id=name] - Button id
 * @param {string} props.buttons[].name - Button name
 * @param {boolean} [props.buttons[].isActive] - Whether to highlight button
 * @param {Object} [props.buttonAll] - Button 'all'
 * @param {(string|number)} [props.buttonAll.id=name] - Button 'all' id
 * @param {string} props.buttonAll.name - Button 'all' name
 * @param {boolean} [props.buttonAll.isActive] - Whether to highlight button 'all'
 * @param {function} [props.onSelect] - Select callback
 */
class ButtonGroup extends React.Component {
  static propTypes = {
    classes: object,
    isMultiple: bool,
    buttons: arrayOf(shape({
      id: oneOfType([string, number]),
      name: string,
      isActive: bool,
    })),
    buttonAll: shape({
      id: oneOfType([string, number]),
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
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    const {
      isMultiple,
      buttons,
      buttonAll,
    } = props;

    this.state = {
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
    if (this.state.buttonAll.isFunctioning === true) {
      this.state.isMultiple = true;
    }
  }

  /**
   * Handle button select
   * @param  {Object} button - Button object
   */
  handleSelect(button) {
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
   * @return {Component}
   */
  render() {
    const {
      buttons,
      buttonAll,
    } = this.state;

    return (
      <ButtonGroupDummy
        buttons={buttons}
        buttonAll={buttonAll}
        onSelect={this.handleSelect.bind(this)}
      />
    );
  }
}

export default ButtonGroup;
