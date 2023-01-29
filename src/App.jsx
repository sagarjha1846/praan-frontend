import { useEffect, useState } from "react";
import Filter from "./Component/Filter";
import Graph from "./Component/Graph";
import Table1 from "./Component/Table";
import axios from "axios";
import Card from "./Component/Card";
import UploadCSV from "./Component/UploadCSV";
function App() {
  const [darkMode, setDarkMode] = useState(false);
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
  const [loading, setLoading] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  useEffect(() => {
    setLoading(true);
    const query = `http://localhost:4000/device/device-details?particle=${machine}&page=${
      tableParams.pagination.current
    }&pageSize=${tableParams.pagination.pageSize}${
      toDate && fromDate
        ? `&toDate=${toDate?.toString()}&fromDate=${fromDate?.toString()}`
        : ""
    }`;

    if (machine !== "Upload CSV")
      axios
        .get(query, {})
        .then((res) => {
          setLoading(false);
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
          setLoading(false);
          console.log(err);
        });
  }, [toDate, fromDate, machine, JSON.stringify(tableParams)]);

  return (
    <div
      className={` w-screen ${darkMode && "dark"} ${
        !darkMode ? "bg-[#E7E7E7]" : "bg-[#082032]"
      } h-screen place-items-center  justify-between align-middle content-center self-center items-center  flex !font-pop`}>
      <div className="w-[30%] justify-between align-middle content-center self-center items-center dark:bg-[#334756] bg-[#FCFCFC] h-screen flex flex-col">
        <Filter
          darkMode={darkMode}
          setToDate={setToDate}
          setFromDate={setFromDate}
          setData={setData}
          machine={machine}
          setMachine={setMachine}
        />
      </div>
      <div className="w-full h-screen overflow-hidden">
        <button
          onClick={toggleDarkMode}
          className=" z-50 absolute right-10 dark:text-white top-6 text-4xl">
          {darkMode ? (
            <i class="fa-regular fa-moon"></i>
          ) : (
            <i class="fa-solid fa-moon"></i>
          )}
        </button>
        <div className="h-full p-5  overflow-y-scroll">
          <div className="grid grid-cols-3 gap-4 mb-5">
            {machine !== "Upload CSV" ? (
              <Card title={"Machine"} value={machine} />
            ) : (
              ""
            )}
            {toDate && <Card title={"To Date"} value={toDate} />}
            {toDate && <Card title={"From Date"} value={fromDate} />}
          </div>
          {machine !== "Upload CSV" ? (
            data.length > 0 ? (
              <div className=" ">
                <div className="w-full flex flex-col justify-between align-middle content-center self-center items-center gap-2">
                  <div className=" w-full h-full mb-5">
                    <Table1
                      toDate={toDate}
                      darkMode={darkMode}
                      fromDate={fromDate}
                      data={data}
                      setData={setData}
                      machine={machine}
                      tableParams={tableParams}
                      setTableParams={setTableParams}
                      loading={loading}
                    />
                  </div>
                  <div className=" w-full h-full mb-5">
                    <Graph data={data} darkMode={darkMode} machine={machine} />
                  </div>
                </div>
              </div>
            ) : (
              <div className=" w-full h-full grid place-content-center ">
                <h1 className=" h-full justify-center content-center  place-items-center text-center">
                  Loading...
                </h1>
              </div>
            )
          ) : (
            <div>
              <UploadCSV />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
