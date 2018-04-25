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

    this.ComponentA = lodable({
      loader: () => {
        return import('./ComponentA');
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
              text: 'ComponentA',
              path: '/componentA',
            }]}
          >
            <Route exact path='/' render={() => (
              <Redirect to='/componentA' />
            )} />
            <Route exact path='/componentA' component={this.ComponentA} />
          </AppFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}
