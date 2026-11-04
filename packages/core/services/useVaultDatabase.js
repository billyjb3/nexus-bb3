import { useState, useEffect } from 'react';
import {
  ref,
  set,
  onValue,
} from 'firebase/database';
import { database } from './firebaseConfig.js';

export function useVaultDatabase(userData) {
  const { userId } = userData;
  const [vaultListData, setVaultListData] = useState({ isLoading: true });

  useEffect(() => {
    const vaultsPath = ref(database, `${userId}/vaults`);

    onValue(vaultsPath, (data) => {
      setVaultListData({
        isLoading: false,
        vaultList: data.val(),
      });
    });
  }, []);

  const initializeAccountData = (userId, email) => {
    return new Promise((res, rej) => {
      set(ref(database, userId), {
        email,
        vaultIds: ['defaultVault'],
        vaults: {},
      })
        .then(() => {
          console.log('successfully initialized account data');
          res();
        })
        .catch((err) => {
          console.log('account data failed to initialize');
          console.log(err);
          rej(err);
        });
    });
  };

  const createVault = (userId, password) => {
    if (!userId || !vaultId) return null;
    set(ref(database, `${userId}/vaultIds`))
  };

  return {
    vaultListData,
  };
}
