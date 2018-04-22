import React from 'react';
import {
  node,
} from 'prop-types';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';

const styles = (theme) => ({
  '@global': {
    html: {
      fontSize: '10px',
    },
  },
});

/**
 * ThemeProvider
 */
@withStyles(styles)
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
      },
      shadows: [
        'none',
        ...new Array(24).fill('0px 2px 6px rgba(0, 0, 0, 0.04)'),
      ],
      typography: {
        htmlFontSize: 10,
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
