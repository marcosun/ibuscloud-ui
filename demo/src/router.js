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

    this.Download = loadable({
      loader: () => {
        return import('./Download');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });

    this.ErrorBoundary = loadable({
      loader: () => {
        return import('./ErrorBoundary');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });

    this.GraphChart = loadable({
      loader: () => {
        return import('./GraphChart');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });

    this.LineChart = loadable({
      loader: () => {
        return import('./LineChart');
      },
      loading: () => {
        return <div>loading</div>;
      },
    });

    this.MatrixChart = loadable({
      loader: () => {
        return import('./MatrixChart');
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
        <Route exact path="/download" component={this.Download} />
        <Route exact path="/errorBoundary" component={this.ErrorBoundary} />
        <Route exact path="/graphChart" component={this.GraphChart} />
        <Route exact path="/lineChart" component={this.LineChart} />
        <Route exact path="/matrixChart" component={this.MatrixChart} />
      </Switch>
    );
  }
}
