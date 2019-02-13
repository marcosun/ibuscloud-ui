import React from 'react';
import { hot } from 'react-hot-loader';
import classNames from 'classnames';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import classes from './index.less';
import logo from './logo.png';

/* Navigate items configuration. */
const navs = [{
  icon: 'bar-chart',
  name: 'BarChart',
  path: '/barChart',
}, {
  icon: 'down-circle',
  name: 'CollapsePanel',
  path: '/collapsePanel',
}, {
  icon: 'download',
  name: 'Download',
  path: '/download',
}, {
  icon: 'warning',
  name: 'ErrorBoundary',
  path: '/errorBoundary',
}, {
  icon: 'fund',
  name: 'GraphChart',
  path: '/graphChart',
}, {
  icon: 'line-chart',
  name: 'LineChart',
  path: '/lineChart',
}, {
  icon: 'sliders',
  name: 'MatrixChart',
  path: '/matrixChart',
}];

/* Test path against current pathname. */
function isPathMatchCurrentLocation(path) {
  /* Path ends with query string is understood as a match. */
  return new RegExp(`^\\${path}(\\?|$)`).test(window.location.pathname);
}

/* Navs is a functional component so that it will get re-rendered whenever route changes. */
function Navs() {
  /* Matched navigate item will be highlighted. */
  const currentNavItem = navs.find((navItem) => {
    return isPathMatchCurrentLocation(navItem.path);
  });

  /* Select the route page with the path. */
  const selectedKeys = currentNavItem !== void 0 ? [currentNavItem.path] : [];

  /* ant-layout-header sets logo height the same as header. */
  const logoClassName = classNames('ant-layout-header', classes.logo);

  return (
    <React.Fragment>
      <div className={logoClassName}>
        <a>
          <img alt="logo" src={logo} />
          <h1>公交云</h1>
        </a>
      </div>
      <Menu mode="inline" selectedKeys={selectedKeys} theme="dark">
        {navs.map((navItem) => (
          /* Iterate and render navigate items. */
          <Menu.Item key={navItem.path}>
            <Link to={navItem.path}>
              <Icon type={navItem.icon} />
              <span>{navItem.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default hot(module)(Navs);
