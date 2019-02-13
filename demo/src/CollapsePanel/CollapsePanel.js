import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { CollapsePanel as IbusCollapsePanel } from 'ibuscloud-ui';

@Form.create()
class CollapsePanel extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
  }

  handleClear = () => {
    const {
      form,
    } = this.props;
    form.resetFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      alert(JSON.stringify(fieldsValue)); // eslint-disable-line no-alert
    });
  }

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;

    const actionComponent = (
      <React.Fragment>
        <Form.Item>
          <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleClear}>Clear</Button>
        </Form.Item>
      </React.Fragment>
    );

    const collapsedComponent = (
      <React.Fragment>
        <Form.Item label="field1">
          {getFieldDecorator('field1', {
            rules: [{
              required: true,
              message: 'Input something!',
            }],
          })(<Input placeholder="placeholder" />)}
        </Form.Item>
        <Form.Item label="field2">
          {getFieldDecorator('field2', {
            rules: [{
              required: true,
              message: 'Input something!',
            }],
          })(<Input placeholder="placeholder" />)}
        </Form.Item>
      </React.Fragment>
    );

    const expandedComponent = (
      <Form.Item label="field3">
        {getFieldDecorator('field3')(<Input placeholder="placeholder" />)}
      </Form.Item>
    );

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <IbusCollapsePanel
          actionComponent={actionComponent}
          collapsedComponent={collapsedComponent}
          expandedComponent={expandedComponent}
        />
      </Form>
    );
  }
}

export default CollapsePanel;
