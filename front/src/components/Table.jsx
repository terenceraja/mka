import React from "react";
import { ReactTabulator } from "react-tabulator";

import { optionsTable } from "../data/Tabulator/Options";

const Table = ({ data, columns, parentClick }) => {
  // console.log(parentClick);
  const rowClickTable = (e, row) => {
    if (parentClick) {
      parentClick(row);
    }
  };

  return (
    <ReactTabulator
      key={JSON.stringify(columns)} // FORCING RERENDER
      data={data}
      columns={columns}
      options={optionsTable}
      events={{
        rowClick: rowClickTable,
      }}
    />
  );
};

export default Table;
