import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { CommonHelmet } from '@nexus-bb3/ui';
import RootContainer from './RootContainer'
import './appStyles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <CommonHelmet />
      <RootContainer />
    </HelmetProvider>
  </React.StrictMode>
);
