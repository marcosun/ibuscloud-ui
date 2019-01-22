import React from 'react';
import {hot} from 'react-hot-loader';
import Layout from 'ibuscloud-ui/Layout';
import Navs from './Navs';
import Router from '../router';

function AppFrame(props) {
  return <Layout contentComponent={<Router />} siderComponent={<Navs />} />;
}

AppFrame.propTypes = {
};

export default hot(module)(AppFrame);
