import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from '@material-ui/core/styles';

import {default as IBusUiStepper} from 'ibuscloud-ui/Stepper';

const styles = (theme) => ({
});

/**
 * Stepper demo
 */
@hot(module)
@withStyles(styles)
class Stepper extends React.Component {
  steps = [{
    name: '基本信息',
    path: 'buttonGroup',
  }, {
    name: '线路规划',
    isActive: true,
  }, {
    name: '发车时间',
    path: 'chip',
    isCompleted: true,
  }, {
    name: '线路预览',
  }];

  /**
   * @return {Component}
   */
  render() {
    return (
      <IBusUiStepper steps={this.steps} />
    );
  }
}

export default Stepper;
