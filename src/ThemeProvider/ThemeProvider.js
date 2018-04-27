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
      typography: {
        headline: {
          fontSize: 35,
          fontWeight: 400,
          color: '#43425D',
        },
        title: {
          fontSize: 28,
          fontWeight: 400,
          color: '#43425D',
        },
        subheading: {
          fontSize: 25,
          fontWeight: 400,
          color: '#4D4F5C',
        },
        body1: {
          fontSize: 15,
          fontWeight: 400,
          color: '#43425D',
        },
        body2: {
          fontSize: 13,
          fontWeight: 400,
          color: '#4D4F5C',
        },
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }
}

export default ThemeProvider;