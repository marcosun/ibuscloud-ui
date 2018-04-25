import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import lodable from 'react-loadable';

import AppFrame from './AppFrame';

/**
 * Return router
 * @return {Router}
 */
export default class Router extends React.Component {
  /**
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.table = lodable({
      loader: () => {
        return import('./Table');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppFrame

          >
            <Route exact path="/table" component={this.table}></Route>
          </AppFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}
