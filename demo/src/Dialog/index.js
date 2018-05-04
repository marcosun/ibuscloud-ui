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
   * Close dialog when Dialog fires onCose event
   */
  handleCloseDialog() {
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
          open={isOpen}
          onClose={this.handleCloseDialog.bind(this)}
        />
      </div>
    );
  }
}

export default Dialog;
