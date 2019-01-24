import React from 'react';
import { hot } from 'react-hot-loader';
import {
  Board,
  BreadcrumbWithTitle,
  GraphChart as IbusGraphChart,
  Panel,
} from 'ibuscloud-ui';

@hot(module)
class GraphChart extends React.PureComponent {
  state={
    data: [],
    isLoading: true,
    links: [],
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        data: [{
          name: '节点1',
          x: 300,
          y: 300,
        }, {
          name: '节点2',
          x: 800,
          y: 300,
        }, {
          name: '节点3',
          x: 550,
          y: 100,
        }, {
          name: '节点4',
          x: 550,
          y: 500,
        }],
        isLoading: false,
        links: [{
          source: 0,
          target: 1,
          value: 0,
        }, {
          source: '节点2',
          target: '节点1',
          value: 0,
        }, {
          source: '节点1',
          target: '节点3',
          value: 40,
        }, {
          source: '节点2',
          target: '节点3',
          value: 30,
        }, {
          source: '节点2',
          target: '节点4',
          value: 10,
        }, {
          source: '节点1',
          target: '节点4',
          value: 20,
        }],
      }));
    }, 5000);
  }

  render() {
    return (
      <div>
        <Board>
          <BreadcrumbWithTitle
            breadCrumbPaths={['ibuscloud-ui', 'graphChart']}
            title="GraphChart"
          />
        </Board>
        <Panel title="GraphChart">
          <IbusGraphChart
            loading={this.state.isLoading}
            series={[{
              data: this.state.data,
              links: this.state.links,
              symbolSize: 50,
            }]}
          />
        </Panel>
      </div>
    );
  }
}

export default GraphChart;
