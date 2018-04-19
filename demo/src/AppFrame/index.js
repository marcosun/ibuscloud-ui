import React from 'react';
import {AppFrame} from 'Library';
import {hot} from 'react-hot-loader';

@hot(module)
/**
 * Export AppFrame Page
 */
export default class AppFramePage extends React.Component {
  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    return <AppFrame />;
  }
}
