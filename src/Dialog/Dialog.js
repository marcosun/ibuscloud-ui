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
 * @param {node} [props.content] - Dialog content
 * @param {string} [props.title=''] - Dialog title
 */
@withStyles(styles, {name: 'IBusUiDialog'})
class Dialog extends React.PureComponent {
  static propTypes = {
    classes: object,
    content: node,
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
      </MuiDialog>
    );
  }
}

export default Dialog;
