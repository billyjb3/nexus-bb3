import React, { useEffect, useState, useRef } from 'react';
import { argon2id } from '@noble/hashes/argon2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

const testVault = [
  {
    location: 'gmail',
    username: 'test user',
    password: 'passwordForGmail',
  },
  {
    location: 'linkedIn',
    username: 'linkedIn user',
    password: 'passwordForLinkedIn',
  },
  {
    location: 'facebook',
    username: 'facebook user',
    password: 'passwordForFacebookUser',
  },
];

const testEncrypted = '8538ffc4a7efd2aeddc4548bcaa14afc08b4ab9e7ea9ca671932a8b5055dbf9743c9e2c14b9e8fe2a6a471723eb9a35438776c9a627c65843cb147f2b2b56610360ce780901854ce75dd76fe47f968e97ee13c0215622dc8b17504e6adaed1cb50406efd3c7de49b119e652a338a6e07f1272ccb92ff6552c6d740e433174f83c27d88bbf3f4df191af979f8b93d223758a0ce57f0f01d91a5fe3ddcdcdfe32f9f74af7f9a4ae39e8a6a4ff3d699141078591f1e691545b4f769638bee2c3b857593e144a5d1ac217023ccb4374b49c9b111f886b7418104d2fd502d732c00e85c629dc0d549701b7b7f56b8c986d39f8ee7f21d80fefb9d1acd98317660ed5e8ff1d422fdde6acb92139ef18f78394edca7814d1a14785250da1a4a6965256bcea474064721219aed8202b2efd8d85eea0c9f97409c531be0fb946b24f1641fe9ea4d8bdc2c80cca5346d2cec813794,6da11a58d983a0f0ecec5e0ac7546ff3,68273093c15c579e6681eb53';

const CryptoTest = () => {
  const epass = useRef(null);
  const dpass = useRef(null);
  const [encrypted, setEncrypted] = useState(testEncrypted);
  const [decrypted, setDecrypted] = useState('');

  const getSalt = () => {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    console.log('generated salt: ' + bytesToHex(salt));
    return salt;
  };

  const handleEncrypt = async () => {
    const salt = getSalt();
    const key = argon2id(epass.current.value, salt);
    console.log('encrypt derived key: ' + bytesToHex(key));

    const data = new TextEncoder().encode(JSON.stringify(testVault, null, 2));
    const aesKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv,
    }, aesKey, data);

    const resultHex = new Uint8Array(encryptedData).toHex();
    const ivHex = new Uint8Array(iv).toHex();
    setEncrypted(`${resultHex},${bytesToHex(salt)},${ivHex}`);
  };

  const handleDecrypt = async () => {
    const split = encrypted.split(',');

    const key = argon2id(dpass.current.value, Uint8Array.fromHex(split[1]));
    const aesKey = await crypto.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt']);
    const data = Uint8Array.fromHex(split[0]).buffer;
    const iv = Uint8Array.fromHex(split[2]).buffer;

    try {
      const decryptedData = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, data);
      const decryptedText = new TextDecoder('utf-8').decode(decryptedData);
      setDecrypted(decryptedText);
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>Test Vault:</div>
      {JSON.stringify(testVault, null, 2)}
      <div>
        <label>Vault Password:</label><input type="text" ref={epass} />
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>

      <div>
        <div>Encrypted Vault:</div>
        <div>{encrypted}</div>
      </div>

      <div>
        <label>Vault Password:</label><input type="text" ref={dpass} />
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>

      <div>
        <div>Decrypted Vault:</div>
        <div>{decrypted}</div>
      </div>
    </div>
  );
};

export default CryptoTest;
