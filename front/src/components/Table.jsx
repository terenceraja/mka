import React from "react";
import { ReactTabulator } from "react-tabulator";

const Table = ({ data, columns, parentClick, options }) => {
  const rowClickTable = (e, row) => {
    parentClick(row);
  };

  return (
    <ReactTabulator
      key={JSON.stringify(columns)} // FORCING RERENDER
      data={data}
      columns={columns}
      options={options}
      events={{
        rowClick: rowClickTable,
      }}
    />
  );
};

export default Table;
