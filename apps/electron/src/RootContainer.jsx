import React from 'react';
import { Router, PageRoute } from '@billyjb3/global-react';
import {
  FileManagerPage,
  NexusPage,
  VaultPage,
  NavBar,
} from '@nexus-bb3/ui';

const RootContainer = () => {
  return (
    <div>
      <Router indexRedirect="/nexus">
        <NavBar />
        <PageRoute path="/nexus" Component={NexusPage} />
        <PageRoute path="/vault" Component={VaultPage} />
        <PageRoute path="/file-manager" Component={FileManagerPage} />
      </Router>
    </div>
  );
};

export default RootContainer;
