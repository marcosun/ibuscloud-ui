import React from 'react';
import {
  arrayOf,
  element,
  instanceOf,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import {hot} from 'react-hot-loader';

import {default as IBusUiAppFrame} from 'ibuscloud-ui/AppFrame';

/**
 * Provides an AppBar and a navigational Drawer
 * @param {(number|RegExp|string)} [props.rootUrl] - App root url.
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
    rootUrl: oneOfType([number, instanceOf(RegExp), string]),
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
      rootUrl,
    } = this.props;

    return (
      <IBusUiAppFrame onSearch={this.handleSearch.bind(this)} navs={navs} rootUrl={rootUrl} >
        {children}
      </IBusUiAppFrame>
    );
  }
}

export default AppFrame;
