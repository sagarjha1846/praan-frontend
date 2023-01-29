import { Table } from "antd";
import { useEffect, useState } from "react";

const Table1 = ({
  tableParams,
  darkMode,
  loading,
  setData,
  setTableParams,
  machine,
  data,
}) => {
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

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <div className="w-full dark:bg-[#334756] bg-[#FBFBFB] shadow-md rounded-md p-3">
      <h1 className="text-2xl dark:text-slate-200 font-bold m-4">Table:</h1>
      {columnDefs && data && (
        <Table
          className={`${darkMode ? "specialStyle" : ""}`}
          bordered={true}
          scroll={{ y: "calc(60vh - 4em)" }}
          style={{
            width: "100%",
            height: "80%",
          }}
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
