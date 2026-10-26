import React from 'react';
import { Router, AuthenticatedRoutes, PageRoute } from '@billyjb3/global-react';
import { useFirebase, FirebaseContext, useActivityTimeout } from '@nexus-bb3/core';
import {
  LoginPage,
  NexusPage,
  VaultPage,
  LoadingPage,
  NavBar,
  FileManagerPage,
} from '@nexus-bb3/ui'

const RootContainer = () => {
  const firebase = useFirebase('web');
  const { isAuthenticated, isLoading, logout } = firebase;
  useActivityTimeout(5*60*1000, logout, isAuthenticated);

  return (
    <div>
      <FirebaseContext.Provider value={firebase}>
        <Router
          indexRedirect="/nexus"
          unauthenticatedRedirect="/login"
          isAuthenticated={isAuthenticated}
        >
          <PageRoute
            path="/login"
            Component={LoginPage}
            isAuthenticatedRoute={true}
          />
          <AuthenticatedRoutes
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            unauthenticatedRedirect="/login"
          >
            {isAuthenticated && <NavBar /> }
            <PageRoute
              path="/nexus"
              Component={NexusPage}
              isAuthenticatedRoute={true}
            />
            <PageRoute
              path="/vault"
              Component={VaultPage}
              isAuthenticatedRoute={true}
            />
            <PageRoute
              path="/file-manager"
              Component={FileManagerPage}
              isAuthenticatedRoute={true}
            />
          </AuthenticatedRoutes>
        </Router>
      </FirebaseContext.Provider>
    </div>
  );
};

export default RootContainer;
