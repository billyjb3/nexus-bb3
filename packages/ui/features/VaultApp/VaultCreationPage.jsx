import React, { useState, useRef } from 'react';

const VaultCreationPage = () => {
  const [rowCount, setRowCount] = useState(10);

  const onSubmit = () => {

  };

  return (
    <div className="content-container margin-auto-lr row pad-4-t">
      <div className="pad-3-b">
        To create a vault, at least one password row needs to be filled out in the table below, and strong master password must be entered. This password will not be stored anywhere and if forgotten, cannot be recovered and the vault will be lost.
      </div>
      <div className="col-6-md-up justify-items-center">
        <table className="vaultTable display-inline-block border-1 color-border-primary">
          <thead className="">
            <tr className="">
              <th className="color-bg-section pad-1 border-b-1 color-border-primary position-sticky-t">Location</th>
              <th className="color-bg-section pad-1 border-b-1 color-border-primary position-sticky-t">Username</th>
              <th className="color-bg-section pad-1 border-b-1 color-border-primary position-sticky-t">Password</th>
            </tr>
          </thead>
          <tbody className="color-bg-surface">
            {Array.from({ length: rowCount }).map((_, i) => (
              <tr>
                <td><input type="text" id={`locationInput${i}`} /></td>
                <td><input type="text" id={`usernameInput${i}`} /></td>
                <td><input type="text" id={`passwordInput${i}`} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot className="color-bg-section position-sticky-b">
            <tr>
              <td colSpan={3} className="text-align-right pad-1">
                <button onClick={() => setRowCount(rowCount + 1)}>Add Row</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="col-6-md-up">
        <label>Master Password:</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default VaultCreationPage;
