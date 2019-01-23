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
          <Button icon="download" type="primary">
            <IbusDownload
              download="logo"
              style={{ color: '#fff' }}
              url={logoIcon}
            >
              Download
            </IbusDownload>
          </Button>
        </Panel>
      </div>
    );
  }
}

export default Download;
