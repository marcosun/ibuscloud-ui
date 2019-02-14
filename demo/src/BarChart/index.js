import React from 'react';
import { hot } from 'react-hot-loader';
import {
  Board,
  BreadcrumbWithTitle,
  Panel,
} from 'ibuscloud-ui';
import PrismMarked from 'react-prism-marked';
import BarChartDemo from './BarChart';

@hot(module)
class BarChart extends React.PureComponent {
  render() {
    const props =  preval`
      module.exports = require('fs').readFileSync(require.resolve('./BarChart.md'), 'utf8')
    `;

    const raw = preval`
    module.exports = require('fs').readFileSync(require.resolve('./BarChart.js'), 'utf8')
    `;

    return (
      <div>
        <Board>
          <BreadcrumbWithTitle breadCrumbPaths={['ibuscloud-ui', 'barChart']} title="BarChart" />
        </Board>
        <Panel>
          <React.Fragment>
            <BarChartDemo />
            <PrismMarked
              text={`## Source\n\`\`\`jsx\n${raw}\n\`\`\`\n${props}`}
            />
          </React.Fragment>
        </Panel>
      </div>
    );
  }
}

export default BarChart;
