/**
 * @module Table
 */
import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

@withStyles(styles, {
  name: 'IBusUiTable',
})
/**
 * Exports Table component
 */
export default class Table extends React.Component {
  static propTypes = {
    classes: object.isRequired,
  };

  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Render Table component
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}></div>
    );
  }
}
