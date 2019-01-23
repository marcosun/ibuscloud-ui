import React from 'react';
import IbusBarChart from 'ibuscloud-ui/BarChart';

export default class BarChart extends React.PureComponent {
  state={
    data: [],
  }

  componentDidMount() {
    setTimeout(() => {
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
