import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

import {default as IBusUiDialog} from 'ibuscloud-ui/Dialog';

const styles = (theme) => ({
});

/**
 * Dialog demo
 */
@hot(module)
@withStyles(styles)
class Dialog extends React.Component {
  state = {
    isOpen: false,
  };

  /**
   * Open dialog when button is clicked
   */
  handleOpenDialog() {
    this.setState({
      isOpen: true,
    });
  }

  /**
   * Close dialog when Dialog fires onClose event
   */
  handleDialogClose() {
    this.setState({
      isOpen: false,
    });
  }

  /**
   * Hook Dialog confirm event
   */
  handleDialogConfirm() {
    alert('Confirm button is clicked');

    this.setState({
      isOpen: false,
    });
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <Button
          color='primary'
          variant='raised'
          onClick={this.handleOpenDialog.bind(this)}
        >
          Open Dialog
        </Button>
        <IBusUiDialog
          content='Pass to dialog content'
          open={isOpen}
          title='Dialog title'
          onClose={this.handleDialogClose.bind(this)}
          onCancel={this.handleDialogClose.bind(this)}
          onConfirm={this.handleDialogConfirm.bind(this)}
        />
      </div>
    );
  }
}

export default Dialog;
