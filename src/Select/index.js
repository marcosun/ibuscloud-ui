import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

/* A wrapper function of AntSelect. Iterate over props.options and render them with AntOption. */
class Select extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })),
  };

  static defaultProps = {
    options: [],
  };

  render() {
    const {
      options,
      ...others
    } = this.props;

    return (
      /**
       * Pass all props except options to AntSelect.
       * In this way, our user can take advantage of all APIs provided by AntSelect.
       */
      <AntSelect {...others} ref={(c) => { this.selectRef = c; }}>
        {options.map((option) => (
          /**
           * Pass option to AntSelect.
           * In this way, our user can take advantage of all APIs provided by AntSelect.Option.
           */
          <Option key={option.value} {...option}>
            {option.name}
          </Option>
        ))}
      </AntSelect>
    );
  }
}

export default Select;
