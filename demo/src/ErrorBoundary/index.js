import React from 'react';
import { hot } from 'react-hot-loader';
import {
  Board,
  BreadcrumbWithTitle,
  ErrorBoundary as IbusErrorBoundary,
  Panel,
} from 'ibuscloud-ui';
import BuggyCounter from './BuggyCounter';

@hot(module)
class ErrorBoundary extends React.PureComponent {
  render() {
    return (
      <div>
        <Board>
          <BreadcrumbWithTitle
            breadCrumbPaths={['ibuscloud-ui', 'errorBoundary']}
            title="ErrorBoundary"
          />
        </Board>
        <Panel>
          <React.Fragment>
            Click on the button to increase the counters.<br />
            The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
          </React.Fragment>
        </Panel>
        <Panel title="These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.">
          <IbusErrorBoundary>
            <BuggyCounter />
            <br />
            <BuggyCounter />
          </IbusErrorBoundary>
        </Panel>
        <Panel title="These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.">
          <React.Fragment>
            <IbusErrorBoundary>
              <BuggyCounter />
            </IbusErrorBoundary>
            <br />
            <IbusErrorBoundary>
              <BuggyCounter />
            </IbusErrorBoundary>
          </React.Fragment>
        </Panel>
      </div>
    );
  }
}

export default ErrorBoundary;
