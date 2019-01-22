import React from 'react';
import {hot} from 'react-hot-loader';
import Layout from 'ibuscloud-ui/Layout';
import Router from '../router';

function AppFrame(props) {
  return <Layout contentComponent={<Router />} />;
}

AppFrame.propTypes = {
};

export default hot(module)(AppFrame);
