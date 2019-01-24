import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Generate a new component by applying className to the root node.
 * @param {string} className The className to be applied.
 * @return {Function} A new component applying the className.
 */
function withRootStyle(className) {
  const StyledComponent = (props) => {
    const {
      className: classNameProp,
      component: Component,
      ...others
    } = props;

    return (
      <Component className={classNames(className, classNameProp)} {...others} />
    );
  };

  StyledComponent.propTypes = {
    /**
     * @ignore
     */
    className: propTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: propTypes.oneOfType([propTypes.string, propTypes.element]),
  };

  StyledComponent.defaultProps = {
    component: 'div',
  };

  return StyledComponent;
}

export default withRootStyle;
