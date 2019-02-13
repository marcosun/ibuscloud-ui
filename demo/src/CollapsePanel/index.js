import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
  Board,
  BreadcrumbWithTitle,
  Panel,
} from 'ibuscloud-ui';
import PrismMarked from 'react-prism-marked';
import CollapsePanelDemo from './CollapsePanel';

@hot(module)
class CollapsePanel extends React.PureComponent {
  render() {
    const raw = preval`
      module.exports = require('fs').readFileSync(require.resolve('./CollapsePanel'), 'utf8')
    `;

    return (
      <div>
        <Board>
          <BreadcrumbWithTitle
            breadCrumbPaths={['ibuscloud-ui', 'collapsePanel']}
            title="CollapsePanel"
          />
        </Board>
        <Panel>
          <React.Fragment>
            <CollapsePanelDemo />
            <PrismMarked
              text={`\`\`\`jsx\n${raw}\n\`\`\``}
            />
          </React.Fragment>
        </Panel>
      </div>
    );
  }
}

export default CollapsePanel;
