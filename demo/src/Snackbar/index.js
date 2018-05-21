import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from '@material-ui/core/styles';

import IBusSnackbar from 'ibuscloud-ui/Snackbar';

const styles = (theme) => ({
});

/**
 * Snackbar demo
 */
@hot(module)
@withStyles(styles)
class Snackbar extends React.Component {
  /**
   * @return {Element}
   */
  render() {
    return (
      <IBusSnackbar open={true} message='message' />
    );
  }
}

export default Snackbar;
