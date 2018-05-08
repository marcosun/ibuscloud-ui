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
    children: node,
    navs: arrayOf(shape({
      icon: element.isRequired,
      path: string,
      text: string.isRequired,
    })),
  };

  /**
   * Search input press enter callback
   * @param  {String} keyword
   */
  handleSearch(keyword) {
    alert(`Search keywords: ${keyword}`);
  }

  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    const {
      children,
      navs,
    } = this.props;

    return (
      <IBusUiAppFrame onSearch={this.handleSearch.bind(this)} navs={navs} >
        {children}
      </IBusUiAppFrame>
    );
  }
}

export default AppFrame;
