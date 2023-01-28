import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Table = ({ data, machine }) => {
  const [columnDefs] = useState([
    { sortable: true, headerName: "Device", field: "device" },
    { sortable: true, headerName: "Timestamp", field: "t" },
    { sortable: true, headerName: "Wind Speed", field: "w" },
    { sortable: true, headerName: "Wind direction", field: "h" },
    {
      sortable: true,
      headerName: machine === "p1" ? "P1" : machine === "p10" ? "P10" : "P25",
      field: machine === "p1" ? "p1" : machine === "p10" ? "p10" : "p25",
    },
  ]);
  return (
    <div className="p-5">
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={data}
          pagination={true}
          paginationPageSize={30}
          sortable={true}
          columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};

export default Table;
