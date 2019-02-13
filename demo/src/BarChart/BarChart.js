import React from 'react';
import { BarChart as IbusBarChart } from 'ibuscloud-ui';

class BarChart extends React.PureComponent {
  state={
    data: [],
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState(() => ({
        data: [
          ['Mon', 10],
          ['Tue', 12],
          ['Wed', 16],
          ['Thu', 2],
          ['Fri', 30],
          ['Sat', 50],
          ['Sun', 20],
        ],
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <IbusBarChart
        loading={this.state.data.length === 0}
        series={[{
          data: this.state.data,
        }]}
      />
    );
  }
}

export default BarChart;
