import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'antd/lib/breadcrumb';
import 'antd/lib/breadcrumb/style';
import classes from './index.less';

/**
 * Render BreadCrumb and title together.
 */
function BreadcrumbWithTitle(props) {
  const { breadCrumbPaths, title } = props;
  return (
    <div>
      <Breadcrumb>
        {breadCrumbPaths.map(breadCrumb => (
          <Breadcrumb.Item key={breadCrumb}>{breadCrumb}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <h2 className={classes.title}>{title}</h2>
    </div>
  );
}

BreadcrumbWithTitle.propTypes = {
  /**
   * List of breadCrumb string to render.
   */
  breadCrumbPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Page title.
   */
  title: PropTypes.string.isRequired,
};

export default BreadcrumbWithTitle;
