import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

class RadioGroup extends React.PureComponent {
  render() {
    const { options, ...others } = this.props;
    /* Set default selected value as the first option available. */
    const defaultValue = options.length === 0 ? void 0 : options[0].value;

    return (
      <Radio.Group buttonStyle="solid" defaultValue={defaultValue} {...others}>
        {
          options.map((option) => (
            /* Set option object to radioButton */
            <Radio.Button
              {...option}
              key={option.value}
              value={option.value}
            >
              {option.name}
            </Radio.Button>
          ))
        }
      </Radio.Group>
    );
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default RadioGroup;
