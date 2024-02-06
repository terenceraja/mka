import React from "react";

import { optionsTable } from "../data/TabulatorData";
import { ReactTabulator } from "react-tabulator";

const Table = ({ data, columns, parentClick }) => {
  const rowClickTable = (e, row) => {
    const activePtf = row.getData();
    parentClick(activePtf);
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
