import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppFrame from './AppFrame';

const App = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
  }}>
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  </div>
);

export default App;
