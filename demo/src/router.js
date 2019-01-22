import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch></Switch>
      </BrowserRouter>
    );
  }
}
