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

    this.ButtonGroup = lodable({
      loader: () => {
        return import('./ButtonGroup');
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
              text: 'ButtonGroup',
              path: '/buttonGroup',
            }]}
          >
            <Route exact path='/' render={() => (
              <Redirect to='/buttonGroup' />
            )} />
            <Route exact path='/buttonGroup' component={this.ButtonGroup} />
          </AppFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}
