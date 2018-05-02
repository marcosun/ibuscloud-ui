import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';

import {default as IBusUiStepper} from 'ibuscloud-ui/Stepper';

const styles = (theme) => ({
});

/**
 * Stepper demo
 */
@hot(module)
@withStyles(styles)
class Stepper extends React.Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <IBusUiStepper />
    );
  }
}

export default Stepper;
