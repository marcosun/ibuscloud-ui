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

    this.Table = lodable({
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
            navs={[{
              text: 'Table',
              path: '/table',
            }]}
          >
            <Route exact path="/table" component={this.Table}></Route>
          </AppFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}
