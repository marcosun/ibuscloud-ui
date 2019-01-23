import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

class Download extends React.PureComponent {
  render() {
    const { children, className, query, queryFormatter, url, ...other } = this.props;
    const stringifiedQuery = queryFormatter(query);

    return (
      <a
        className={className}
        href={`${url}${stringifiedQuery !== '' ? `?${stringifiedQuery}` : ''}`}
        {...other}
      >
        {children}
      </a>
    );
  }
}

Download.propTypes = {
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Query object.
   */
  query: PropTypes.object,
  /**
   * Query will stringifing by default URI endoces output.
   */
  queryFormatter: PropTypes.func,
  /**
   * Request url.
   */
  url: PropTypes.string.isRequired,
};

Download.defaultProps = {
  queryFormatter: qs.stringify,
};

export default Download;
