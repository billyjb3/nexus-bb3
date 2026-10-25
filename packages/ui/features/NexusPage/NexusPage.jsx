import React from 'react';
import { useRouter } from '@billyjb3/global-react';

const NexusPage = () => {
  const { push } = useRouter();
  return (
    <div className="height-page color-bg-primary color-text-primary body">
      <div className="text-align-center heading-2 pad-4">NEXUS</div>
      <div>
        <button onClick={() => push('/vault')}>Vault</button>
      </div>
    </div>
  );
};

export default NexusPage;
