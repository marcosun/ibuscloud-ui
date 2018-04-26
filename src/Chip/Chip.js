import React from 'react';
import {
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {default as MuiChip} from 'material-ui/Chip';

const styles = (theme) => ({

});

/**
 * @param {Object} props
 */
@withStyles(styles, {name: 'IBusUiChip'})
class Chip extends React.Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <MuiChip />
    );
  }
}

export default Chip;
