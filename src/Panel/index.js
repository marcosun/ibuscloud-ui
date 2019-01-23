import React from 'react';
import propTypes from 'prop-types';
import Board from '../Board';
import classes from './index.less';

class Panel extends React.PureComponent {
  /**
   * Render Header part of Panel,
   * if title and action props not delivered, do not render header.
   */
  renderHeader() {
    const { title, action } = this.props;
    if (title === undefined && action === undefined) return null;
    return (
      <Board className={classes.header}>
        <h3 className={classes.title}>{title}</h3>
        <span>{action}</span>
      </Board>
    );
  }

  render() {
    const { children } = this.props;

    const panelHeader = this.renderHeader();
    const panelContent = (
      <Board>
        {children}
      </Board>
    );

    return (
      <div className={classes.root}>
        {panelHeader}
        {panelContent}
      </div>
    );
  }
}

Panel.propTypes = {
  /**
   * Right area of header, where provides place for interactive components.
   */
  action: propTypes.node,
  /**
   * @ignore
   */
  children: propTypes.element,
  /**
   * Panel Title
   */
  title: propTypes.node,
};

export default Panel;
