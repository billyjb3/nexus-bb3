import React from 'react';
import './styles.scss';

const DataTable = (props) => {
  const {
    headers,
    data,
    tableClass = '',
    tbodyClass = '',
    thClass = '',
    tdClass = '',
  } = props;

  return (
    <table className={`${tableClass} table`}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th className={`${thClass}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className={`${tbodyClass}`}>
        {data.map((row) => (
          <tr>
            {Object.values(row).map((value) => (
              <td className={`${tdClass}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
