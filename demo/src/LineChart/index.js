import React from 'react';
import { hot } from 'react-hot-loader';
import {
  Board,
  BreadcrumbWithTitle,
  LineChart as IbusLineChart,
  Panel,
} from 'ibuscloud-ui';
import moment from 'moment';

@hot(module)
class LineChart extends React.PureComponent {
  state={
    data: [],
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState(() => ({
        data: [
          [moment('00:00', 'HH:mm').valueOf(), 10],
          [moment('01:00', 'HH:mm').valueOf(), 12],
          [moment('12:00', 'HH:mm').valueOf(), 16],
          [moment('18:00', 'HH:mm').valueOf(), 2],
          [moment('20:00', 'HH:mm').valueOf(), 30],
          [moment('21:00', 'HH:mm').valueOf(), 50],
          [moment('22:00', 'HH:mm').valueOf(), 20],
        ],
      }));
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div>
        <Board>
          <BreadcrumbWithTitle breadCrumbPaths={['ibuscloud-ui', 'lineChart']} title="LineChart" />
        </Board>
        <Panel title="LineChart">
          <IbusLineChart
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

export default LineChart;
