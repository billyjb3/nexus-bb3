import React from 'react';

const DataTableHeaderRow = (props) => {
  const {
    children,
    headClass = '',
    rowClass = '',
  } = props;

  return (
    <thead className={headClass}>
      <tr className={rowClass}>
        {children}
      </tr>
    </thead>
  );
};

export default DataTableHeaderRow;
