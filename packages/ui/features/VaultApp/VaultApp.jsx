import React, { useState, useEffect } from 'react';
import { PageRoute } from '@billyjb3/global-react';
import { useVaultDatabase, useAuthContext } from '@nexus-bb3/core';
import { getMockData, DataTable } from '../../components';
import LoadingPage from '../LoadingPage/LoadingPage.jsx';
import VaultCreationPage from './VaultCreationPage.jsx';
import './styles.scss';

const VaultApp = () => {
  const { userData } = useAuthContext();
  const { vaultListData: { isLoading, vaultList } } = useVaultDatabase(userData);

  return isLoading ? <LoadingPage /> : (
    <div className="flex-grow color-bg-primary color-text-primary body">
      {!vaultList ? (
        <VaultCreationPage />
      ) : (
        <div>Main Vault Page</div>
      )}
      {/*<div className="display-inline-block pad-4-tb">*/}
      {/*  <DataTable*/}
      {/*    headers={['location', 'username', 'password']}*/}
      {/*    data={getMockData()}*/}
      {/*    tableClass="vaultTable border-1 color-border-primary display-inline-block"*/}
      {/*    thClass="position-sticky-t border-b-1 color-border-primary pad-2 color-bg-section barlow body-small uppercase condensed text-align-left"*/}
      {/*    tdClass="pad-1-tb pad-2-lr color-bg-surface body body-small condensed"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default VaultApp;
