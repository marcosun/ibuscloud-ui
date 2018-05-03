import React from 'react';
import {
  bool,
  string,
  object,
  shape,
  arrayOf,
} from 'prop-types';
import {withRouter} from 'react-router';
import {
  default as MuiStepper,
  Step,
  StepButton,
  StepLabel,
} from 'material-ui/Stepper';

/**
 * Horizontal steppers only.
 * Step with isActive = true is the current step. If multiple steps are set to
 * have isActive = true, the first step in the array will be regarded as the
 * current step.
 * Step with isCompleted = true can be clicked to redirect to the
 * corresponding address.
 * @param {Object[]} [props.steps=[]] - An aray of steps
 * @param {boolean} [props.steps.isActive=false] - Is current step
 * @param {boolean} [props.steps.isCompleted=false] - Is this step completed
 * @param {string} props.steps.name - Step name
 * @param {string} props.steps.path - Path to redirect when clicked
 */
@withRouter
class Stepper extends React.PureComponent {
  static propTypes = {
    history: object,
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
   * @param {boolean} step.isActive - Is current step
   * @param {string} step.path - Path to redirect
   */
  handleStepClick({isActive, path}) {
    const {history} = this.props;

    if (typeof path === 'string' && isActive !== true) {
      history.push(path);
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
