import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from 'ibuscloud-ui/ThemeProvider';

import App from './app';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
