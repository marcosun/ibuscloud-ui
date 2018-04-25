import React from 'react';
import {object} from 'prop-types';
import Table from 'ibuscloud-ui/Table';

/**
 * Table page
 */
export default class table extends React.Component {
  static propTypes = {};

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render table component
   * @return {Component}
   */
  render() {
    return (
      <Table></Table>
    );
  }
}
