import React from 'react';
import { useRouter } from '@billyjb3/global-react';
import { useAuthContext } from '@nexus-bb3/core';
import { ButtonText } from '../../components';

const NavBar = () => {
  const { push } = useRouter();
  const { logout } = useAuthContext();
  return (
    <div className="flex flex-justify-center color-bg-primary border-b-1 color-border-primary position-relative">
      <ButtonText className="pad-2 color-text-primary" onClick={() => push('/nexus')}>Nexus</ButtonText>
      <ButtonText className="pad-2 color-text-primary" onClick={() => push('/vault')}>Vault</ButtonText>
      <ButtonText className="pad-2 color-text-primary" onClick={() => push('/file-manager')}>File Manager</ButtonText>
      <ButtonText
        className="pad-2 color-text-primary position-absolute-r"
        onClick={() => logout()}
      >
        Logout
      </ButtonText>
    </div>
  );
};

export default NavBar;
