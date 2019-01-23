import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import loadable from 'react-loadable';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    this.BarChart = loadable({
      loader: () => {
        return import('./BarChart');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });

    this.CollapsePanel = loadable({
      loader: () => {
        return import('./CollapsePanel');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/barChart" />} />
        <Route exact path="/barChart" component={this.BarChart} />
        <Route exact path="/collapsePanel" component={this.CollapsePanel} />
      </Switch>
    );
  }
}
