import React from 'react';

const DataTableHeaderRow = (props) => {
  const {
    value,
    className = '',
  } = props;

  return (
    <th className={className}>
      {value}
    </th>
  );
};

export default DataTableHeaderRow;
