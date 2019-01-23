import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import classNames from 'classnames';
import classes from './index.less';

/**
 * The collapse icon is always on the right and does not interfere with other content.
 * The collapsed status is controlled by internal state.
 * If true, show collapsible content, otherwise expanded.
 * You can override all the class names injected to the classes property.
 */
class CollapsePanel extends React.PureComponent {
  state = {
    collapsed: true,
  };

  /**
   * Clicking on expand or collapse icon.
   */
  handleExpandOrCollapse = () => {
    this.setState((state) => {
      return {
        collapsed: !state.collapsed,
      };
    });
  }

  render() {
    const {
      actionComponent,
      classes: classesProp,
      className: classNameProp,
      collapsedComponent,
      expandedComponent,
    } = this.props;
    const { collapsed } = this.state;

    /* Override the root, content, collapsibleContent, action style. */
    const className = classNames(classes.root, classesProp.root, classNameProp);
    const contentClassName = classNames(classes.content, classesProp.content);
    const collapsedContentClassName = classesProp.collapsedContent;
    const actionClassName = classNames(classes.action, classesProp.action);

    return (
      <div className={className}>
        <div className={contentClassName}>
          {collapsedComponent}
          {/* Collapsible area. */}
          <div className={collapsedContentClassName} hidden={collapsed}>{expandedComponent}</div>
        </div>
        <div className={actionClassName}>
          { actionComponent }
          {
            /**
             * User agent's button style is significantly different to normal anchor
             * element.
             * In order to simplify code base, I chose to use a normal anchor element.
             */
            /* eslint-disable jsx-a11y/anchor-is-valid */
          }
          <a
            aria-expanded={!collapsed}
            onClick={this.handleExpandOrCollapse}
            /* Accessibility: Any keyboard press equivalent to a click. */
            onKeyPress={this.handleExpandOrCollapse}
            role="button"
            /* Allow keyboard navigate. */
            tabIndex={0}
          >
            {collapsed ? '展开' : '收起'}
            <Icon type={collapsed ? 'down' : 'up'} />
          </a>
        </div>
      </div>
    );
  }
}

CollapsePanel.propTypes = {
  /**
   * The action content.
   */
  actionComponent: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The collapsed content element.
   */
  collapsedComponent: PropTypes.node,
  /**
   * The expanded content element.
   */
  expandedComponent: PropTypes.node,
};

CollapsePanel.defaultProps = {
  classes: {},
};

export default CollapsePanel;
