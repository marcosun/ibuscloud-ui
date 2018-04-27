import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import Typography from 'material-ui/Typography';

const styles = (theme) => ({
});

/**
 * Theme demo
 */
@hot(module)
@withStyles(styles)
class Theme extends React.Component {
  /**
   * @return {Component}
   */
  render() {
    return (
      <Paper>
        <Typography variant='display4'>display4</Typography>
        <Typography variant='display3'>display3</Typography>
        <Typography variant='display2'>display2</Typography>
        <Typography variant='display1'>display1</Typography>
        <Typography variant='headline'>headline</Typography>
        <Typography variant='title'>title</Typography>
        <Typography variant='subheading'>subheading</Typography>
        <Typography variant='body2'>body2</Typography>
        <Typography variant='body1'>body1</Typography>
        <Typography variant='caption'>caption</Typography>
        <Typography variant='button'>button</Typography>
      </Paper>
    );
  }
}

export default Theme;
