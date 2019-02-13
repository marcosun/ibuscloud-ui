import React from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import {
  Board,
  BreadcrumbWithTitle,
  Download as IbusDownload,
  Panel,
} from 'ibuscloud-ui';
import logoIcon from './logo.png';

@hot(module)
class Download extends React.PureComponent {
  render() {
    return (
      <div>
        <Board>
          <BreadcrumbWithTitle breadCrumbPaths={['ibuscloud-ui', 'download']} title="Download" />
        </Board>
        <Panel>
          <IbusDownload download="logo" url={logoIcon}>
            <Button icon="download" type="primary">Download</Button>
          </IbusDownload>
        </Panel>
      </div>
    );
  }
}

export default Download;
