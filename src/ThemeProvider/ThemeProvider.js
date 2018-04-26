import React from 'react';
import {
  node,
} from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';

// Set root font size to 10px to simplify rem calculation.
const styles = (theme) => ({
});

/**
 * IBusCloud-UI customised theme on top of Material-UI.
 */
@withStyles(styles, {name: 'IBusUiThemeProvider'})
class ThemeProvider extends React.Component {
  static propTypes = {
    children: node,
  };

  /**
   * @return {Component}
   */
  render() {
    const {
      children,
    } = this.props;

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#3B86FF',
        },
        text: {
          primary: '#43425D',
        },
      },
      shadows: [
        'none',
        ...new Array(24).fill('0px 2px 6px rgba(0, 0, 0, 0.04)'),
      ],
    });

    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

export default ThemeProvider;
