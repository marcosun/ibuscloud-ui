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

    this.Chip = lodable({
      loader: () => {
        return import('./Chip');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });

    this.Stepper = lodable({
      loader: () => {
        return import('./Stepper');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });

    this.Table = lodable({
      loader: () => {
        return import('./Table');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });

    this.Theme = lodable({
      loader: () => {
        return import('./Theme');
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
              icon: <use href="#icon-icon_line"></use>,
              path: '/buttonGroup',
            }, {
              text: 'Chip',
              icon: <use href="#icon-icon_board"></use>,
              path: '/chip',
            }, {
              text: 'Stepper',
              icon: <use href="#icon-icon_board"></use>,
              path: '/stepper',
            }, {
              text: 'Table',
              icon: <use href="#icon-icon_car"></use>,
              path: '/table',
            }, {
              text: 'Theme',
              icon: <use href="#icon-icon_changz"></use>,
              path: '/theme',
            }]}
          >
            <Route exact path='/' render={() => (
              <Redirect to='/buttonGroup' />
            )} />
            <Route exact path='/buttonGroup' component={this.ButtonGroup} />
            <Route exact path='/chip' component={this.Chip} />
            <Route exact path='/stepper' component={this.Stepper} />
            <Route exact path="/table" component={this.Table}></Route>
            <Route exact path="/theme" component={this.Theme}></Route>
          </AppFrame>
        </Switch>
      </BrowserRouter>
    );
  }
}
