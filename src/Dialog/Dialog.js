import React from 'react';
import {
  object,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {
  default as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = (theme) => {
  return {
  };
};

/**
 * Dialog
 */
@withStyles(styles, {name: 'IBusUiDialog'})
class Dialog extends React.PureComponent {
  static propTypes = {
    classes: object,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      ...others
    } = this.props;

    return (
      <MuiDialog {...others}>
      </MuiDialog>
    );
  }
}

export default Dialog;
