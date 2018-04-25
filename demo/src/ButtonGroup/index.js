import React from 'react';
import {hot} from 'react-hot-loader';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import {default as IBusUiButtonGroup} from 'ibuscloud-ui/ButtonGroup';

const styles = (theme) => ({

});

/**
 * Demonstrating four features:
 * 1. Single select
 * 2. Multiple select
 * 3. Multiple select with Button ALL
 * 4. Select callback
 */
@hot(module)
@withStyles(styles)
class ButtonGroup extends React.Component {
  /**
   * Hook button select callback.
   * @param {Object} button - Clicked button
   * @param {Object[]} buttonList - All selected buttons
   */
  handleSelect(button, buttonList) {
    alert(`You have clicked: ${JSON.stringify(button)}\n All selected buttons are: ${JSON.stringify(buttonList)}`);
  }

  /**
   * @return {Component}
   */
  render() {
    return (
      <div>
        <Typography variant='headline'>
          Single Select 单选
        </Typography>
        <IBusUiButtonGroup
          buttons={[{
            name: '一公司',
          }, {
            name: '二公司',
          }, {
            name: '三公司',
          }]}
        />
        <br />
        <Typography variant='headline'>
          Multiple Select 多选
        </Typography>
        <IBusUiButtonGroup
          isMultiple={true}
          buttons={[{
            name: '一公司',
          }, {
            name: '二公司',
          }, {
            name: '三公司',
          }]}
        />
        <br />
        <Typography variant='headline'>
          Multiple Select With Button ALL 多选带全选
        </Typography>
        <IBusUiButtonGroup
          buttons={[{
            name: '一公司',
          }, {
            name: '二公司',
          }, {
            name: '三公司',
          }]}
          buttonAll={{
            name: '全部',
          }}
        />
        <br />
        <Typography variant='headline'>
          Select Callback 选中回调
        </Typography>
        <IBusUiButtonGroup
          buttons={[{
            name: '一公司',
          }, {
            name: '二公司',
          }, {
            name: '三公司',
          }]}
          buttonAll={{
            name: '全部',
          }}
          onSelect={this.handleSelect.bind(this)}
        />
      </div>
    );
  }
}

export default ButtonGroup;
