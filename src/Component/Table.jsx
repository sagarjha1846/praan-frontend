import { Table } from "antd";
import { useEffect, useState } from "react";

const Table1 = ({ tableParams, setData, setTableParams, machine, data }) => {
  const [loading, setLoading] = useState(false);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    setColumnDefs([
      { title: "Device", dataIndex: "device" },
      { title: "Timestamp", dataIndex: "t" },
      { title: "Wind Speed", dataIndex: "w" },
      { title: "Wind direction", dataIndex: "h" },
      {
        title: machine === "p1" ? "P1" : machine === "p10" ? "P10" : "P25",
        dataIndex: machine === "p1" ? "p1" : machine === "p10" ? "p10" : "p25",
      },
    ]);
  }, [data, machine]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">Table:</h1>
      {columnDefs && data && (
        <Table
          columns={columnDefs}
          // rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      )}
    </div>
  );
};
export default Table1;
