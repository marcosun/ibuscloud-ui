import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import {default as IBusUiChip} from 'ibuscloud-ui/Chip';

const styles = (theme) => ({
});

/**
 * Chip demo
 */
@hot(module)
@withStyles(styles)
class Chip extends React.Component {
  /**
   * Handle click on delete icon
   * @param  {[type]} e [description]
   */
  handleDelete() {
    alert('You clicked the delete icon.');
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <Paper>
        <IBusUiChip
          label='10车队'
          onDelete={this.handleDelete.bind(this)}
        />
      </Paper>
    );
  }
}

export default Chip;
