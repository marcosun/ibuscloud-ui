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
 * Presentational component for ButtonGroup.
 * Use this module only if ButtonGroup logics does not satisfy your requirements
 * or other modules need to change button group states.
 * @param {Object} props
 * @param {Object[]} [props.buttons] - Button list
 * @param {string} [props.buttons[].id=name] - Button id
 * @param {string} props.buttons[].name - Button name
 * @param {boolean} [props.buttons[].isActive] - Whether to highlight button
 * @param {Object} [props.buttonAll={}] - Button 'all'
 * @param {string} [props.buttonAll.id=name] - Button 'all' id
 * @param {string} props.buttonAll.name - Button 'all' name
 * @param {boolean} [props.buttonAll.isActive] - Whether to highlight button 'all'
 * @param {function} [props.onSelect] - Select callback
 */
@withStyles(styles, {name: 'IBusUiButtonGroupDummy'})
class ButtonGroupDummy extends React.Component {
  static propTypes = {
    classes: object,
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
      buttons,
      buttonAll,
    } = nextProps;

    const state = {
      // Deep copy to scrutinise and validate props properties
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

    return state;
  }

  state = {};

  /**
   * Call parent component onSelect handler with clicked button
   * and all buttons
   * @param  {Object} button - Button object
   */
  handleClick(button) {
    if (typeof this.props.onSelect === 'function') {
      let clickedButton = {
        name: button.name,
        id: button.id,
      };

      this.props.onSelect(clickedButton, this.state.buttons);
    }
  }

  /**
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
          buttonAll.isFunctioning === true && buttonAllElement
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

export default ButtonGroupDummy;
