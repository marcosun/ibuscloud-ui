import React from 'react';
import {
  string,
  object,
  node,
  func,
} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  dialog: {
    minWidth: 640,
    minHeight: 216,
  },
  title: {
    fontSize: 22,
  },
});

/**
 * Popup a Dialog which is customised on top of MuiDialog.
 * It provides a title, cancel and confirm button as well as callbacks.
 * All other parameters not specified in the following docs will be
 * passed to MuiDialog directly.
 * @param {string} [props.cancelButtonText='取消'] - Cancel button text
 * @param {string} [props.confirmButtonText='确定'] - Confirm button text
 * @param {node} [props.content] - Dialog content
 * @param {string} [props.title=''] - Dialog title
 * @param {function} [props.onCancel] - Callback fired when cancel button is
 * clicked
 * @param {function} [props.onConfirm] - Callback fired when confirm button is
 * clicked
 */
@withStyles(styles, {name: 'IBusUiDialog'})
class Dialog extends React.PureComponent {
  static propTypes = {
    classes: object,
    cancelButtonText: string,
    confirmButtonText: string,
    content: node,
    title: string,
    onCancel: func.isRequired,
    onConfirm: func.isRequired,
  };

  static defaultProps = {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    title: '',
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      cancelButtonText,
      confirmButtonText,
      content,
      title,
      onCancel,
      onConfirm,
      ...others
    } = this.props;

    return (
      <MuiDialog
        classes={{
          paper: classes.dialog,
        }}
        {...others}
      >
        <DialogTitle disableTypography={true}>
          <Typography
            classes={{
              title: classes.title,
            }}
            variant="title"
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          <Button
            color="default"
            onClick={onCancel}
          >
            {cancelButtonText}
          </Button>
          <Button
            color="primary"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      </MuiDialog>
    );
  }
}

export default Dialog;
