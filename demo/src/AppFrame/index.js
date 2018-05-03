import React from 'react';
import {
  string,
  node,
  shape,
  arrayOf,
  element,
} from 'prop-types';
import {hot} from 'react-hot-loader';

import {default as IBusUiAppFrame} from 'ibuscloud-ui/AppFrame';

/**
 * Provides an AppBar and a navigational Drawer
 */
@hot(module)
class AppFrame extends React.Component {
  static propTypes = {
    navs: arrayOf(shape({
      text: string.isRequired,
      icon: element.isRequired,
      path: string,
    })),
    children: node,
  };

  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    const {
      navs,
      children,
    } = this.props;

    return (
      <IBusUiAppFrame navs={navs}>
        {children}
      </IBusUiAppFrame>
    );
  }
}

export default AppFrame;
