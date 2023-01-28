import { useEffect, useState } from "react";
import Filter from "./Component/Filter";
import Graph from "./Component/Graph";
import Table1 from "./Component/Table";
import axios from "axios";
import { reformatDate } from "./util/helper";
function App() {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [machine, setMachine] = useState("p1");
  const [data, setData] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    const query = `http://localhost:4000/device/device-details?particle=${machine}&page=${
      tableParams.pagination.current
    }&pageSize=${tableParams.pagination.pageSize}${
      toDate && fromDate
        ? `&toDate=${reformatDate(toDate)?.toString()}&fromDate=${reformatDate(
            fromDate
          )?.toString()}`
        : ""
    }`;

    axios
      .get(query, {})
      .then((res) => {
        setData(res.data.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.count,
          },
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }, [toDate, fromDate, machine, JSON.stringify(tableParams)]);

  return (
    <div className=" w-screen h-screen place-items-center  justify-between align-middle content-center self-center items-center  flex !font-pop">
      <div className="w-[30%] p-5 justify-between align-middle content-center self-center items-center bg-slate-300 h-screen flex flex-col">
        <Filter
          toDate={toDate}
          setToDate={setToDate}
          setFromDate={setFromDate}
          fromDate={fromDate}
          setData={setData}
          machine={machine}
          setMachine={setMachine}
        />
      </div>
      <div className="w-full h-screen overflow-hidden">
        {data.length > 0 ? (
          <div className=" h-full p-5  overflow-y-scroll">
            <div className="w-full flex flex-col justify-between align-middle content-center self-center items-center px-10 gap-2">
              <div className=" w-full h-full">
                <Table1
                  toDate={toDate}
                  fromDate={fromDate}
                  data={data}
                  setData={setData}
                  machine={machine}
                  tableParams={tableParams}
                  setTableParams={setTableParams}
                />
              </div>
              <div className=" w-full h-full">
                <Graph />
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-full h-full grid place-content-center ">
            <h1 className=" h-full justify-center content-center  place-items-center text-center">
              Loading...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
