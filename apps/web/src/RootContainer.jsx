import React from 'react';
import { Router, AuthenticatedRoutes, PageRoute } from '@billyjb3/global-react';
import { useAuth, AuthContext, useActivityTimeout } from '@nexus-bb3/core';
import {
  LoginPage,
  NexusPage,
  LoadingPage,
  NavBar,
  FileManagerPage,
  VaultApp,
} from '@nexus-bb3/ui'

const RootContainer = () => {
  const isDev = import.meta.env.DEV;
  const authState = useAuth();
  const { isAuthLoading, isAuthenticated, logout } = authState;
  useActivityTimeout(5*60*1000, logout, !isDev && isAuthenticated);

  return (
    <div className="height-page flex flex-column">
      <AuthContext.Provider value={authState}>
        <Router
          indexRedirect="/nexus"
          unauthenticatedRedirect="/login"
          isAuthenticated={isAuthenticated}
        >
          <PageRoute
            path="/login"
            Component={LoginPage}
          />
          <AuthenticatedRoutes
            isAuthenticated={isAuthenticated}
            isLoading={isAuthLoading}
            unauthenticatedRedirect="/login"
          >
            <NavBar />
            <PageRoute
              path="/nexus"
              Component={NexusPage}
            />
            <PageRoute
              path="/vault"
              Component={VaultApp}
            />
            <PageRoute
              path="/file-manager"
              Component={FileManagerPage}
            />
          </AuthenticatedRoutes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default RootContainer;
