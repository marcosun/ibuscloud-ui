import React from 'react';
import {
  string,
  object,
  node,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {
  default as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

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
 * Dialog
 * @param {string} [props.cancelButtonText='取消'] - Cancel button text
 * @param {string} [props.confirmButtonText='确定'] - Confirm button text
 * @param {node} [props.content] - Dialog content
 * @param {string} [props.title=''] - Dialog title
 */
@withStyles(styles, {name: 'IBusUiDialog'})
class Dialog extends React.PureComponent {
  static propTypes = {
    classes: object,
    cancelButtonText: string,
    confirmButtonText: string,
    content: node,
    title: string,
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
          <Button color="default">
            {cancelButtonText}
          </Button>
          <Button color="primary">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </MuiDialog>
    );
  }
}

export default Dialog;
