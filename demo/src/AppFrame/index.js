import React from 'react';
import {hot} from 'react-hot-loader';

import {AppFrame} from 'ibuscloud-ui';

/**
 * Export AppFrame Page
 */
@hot(module)
class AppFramePage extends React.Component {
  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    return (
      <AppFrame>
        <div>123</div>
      </AppFrame>
    );
  }
}

export default AppFramePage;
