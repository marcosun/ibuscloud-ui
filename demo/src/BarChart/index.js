import React from 'react';
import {
  BarChart as IbusBarChart,
  Board,
  BreadcrumbWithTitle,
  Panel,
} from 'ibuscloud-ui';

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
      <div>
        <Board>
          <BreadcrumbWithTitle breadCrumbPaths={['ibuscloud-ui', 'barChart']} title="BarChart" />
        </Board>
        <Panel title="BarChart">
          <IbusBarChart
            loading={this.state.data.length === 0}
            series={[{
              data: this.state.data,
            }]}
          />
        </Panel>
      </div>
    );
  }
}
