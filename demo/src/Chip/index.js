import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import {default as IBusUiChip} from 'ibuscloud-ui/Chip';

const styles = (theme) => ({

});

/**
 * 
 */
@hot(module)
@withStyles(styles)
class Chip extends React.Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <IBusUiChip></IBusUiChip>
    );
  }
}

export default Chip;
