import React from 'react';
import {
  object,
} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
});

/**
 * Sanckbar
 */
@withStyles(styles, {name: 'IBusUiSnackbar'})
class Snackbar extends React.PureComponent {
  static propTypes = {
    classes: object,
  };

  /**
   * @return {Element}
   */
  render() {
    const {
      classes,
      ...others
    } = this.props;

    return (
      <MuiSnackbar
        ContentProps={{
          classes: {root: classes.root},
        }}
        {...others}
      />
    );
  }
}

export default Snackbar;
