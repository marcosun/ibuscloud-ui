import React from 'react';
import {
  string,
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
import Typography from 'material-ui/Typography';

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
 * @param {string} [props.title=''] - Dialog title
 */
@withStyles(styles, {name: 'IBusUiDialog'})
class Dialog extends React.PureComponent {
  static propTypes = {
    classes: object,
    title: string,
  };

  static defaultProps = {
    title: '',
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
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
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
      </MuiDialog>
    );
  }
}

export default Dialog;
