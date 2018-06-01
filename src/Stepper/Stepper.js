import React from 'react';
import {
  arrayOf,
  bool,
  func,
  object,
  shape,
  string,
} from 'prop-types';
import {withRouter} from 'react-router';
import MuiStepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';

/**
 * Horizontal steppers only.
 * Step with isActive = true is the current step. If multiple steps are set to
 * have isActive = true, the first step in the array will be regarded as the
 * current step.
 * Step with isCompleted = true can be clicked to redirect to the
 * corresponding address.
 * @param {function} [onClick] - Fire callback when step item is clicked.
 * If function is defined, default router redirect will be disabled.
 * @param {Object[]} [props.steps=[]] - An aray of steps
 * @param {boolean} [props.steps.isActive=false] - Is current step
 * @param {boolean} [props.steps.isCompleted=false] - Is this step completed
 * @param {string} props.steps.name - Step name
 * @param {string} [props.steps.path] - Path to redirect when clicked
 */
@withRouter
class Stepper extends React.PureComponent {
  static propTypes = {
    history: object,
    onClick: func,
    steps: arrayOf(shape({
      isActive: bool,
      isCompleted: bool,
      name: string.isRequired,
      path: string,
    })),
  };

  static defaultProps = {
    steps: [],
  };

  /**
   * If clicked step is not equal to current step,
   * redirect to address specified by path.
   * If props.onClick is defined, default router redirect will be disabled.
   * @param {object} step - Clicked step.
   */
  handleStepClick(step) {
    const {
      history,
      onClick,
    } = this.props;

    const {
      isActive,
      path,
    } = step;

    if (isActive !== true) {
      if (typeof onClick === 'function') {
        onClick(step);
      } else {
        typeof path === 'string' && history.push(path);
      }
    }
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      steps,
    } = this.props;

    const activeStepIndex = steps.findIndex((step) => { // Current step index
      return step.isActive === true;
    });

    const isNextStepCompleted = steps.filter((step, index) => {
      return index > activeStepIndex; // Next steps
    }).findIndex((step) => { // Find a completed step
      return step.isCompleted === true;
    }) !== -1;

    return (
      <MuiStepper
        activeStep={activeStepIndex}
        elevation={1}
        nonLinear={isNextStepCompleted}
      >
        {
          steps.map((step, index) => {
            if (index < activeStepIndex || step.isCompleted === true) {
              return (
                <Step
                  completed
                  key={step.name}
                  onClick={this.handleStepClick.bind(this, step)}
                >
                  <StepButton>{step.name}</StepButton>
                </Step>
              );
            }
            return (
              <Step key={step.name}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            );
          })
        }
      </MuiStepper>
    );
  }
}

export default Stepper;
