import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import lodable from 'react-loadable';

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

    this.AppFrame = lodable({
      loader: () => {
        return import('./AppFrame');
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
          <Route exact path='/' render={() => (<Redirect to='/appFrame' />)} />
          <Route exact path='/appFrame' component={this.AppFrame} />
        </Switch>
      </BrowserRouter>
    );
  }
}
