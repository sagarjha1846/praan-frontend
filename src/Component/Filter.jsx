import React, { useEffect, useState } from "react";
import axios from "axios";
const Filter = ({ setData, machine, setMachine }) => {
  const deviceList = ["p1", "p25", "p10"];
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const reformatDate = (date) => {
    if (date)
      return (
        date?.split("T")[0].replaceAll("-", "/") +
        "," +
        date.split("T")[1].replaceAll("-", "/") +
        ":00"
      );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/device/device-details/${machine}/`, {
        toDate: toDate ? toDate : "",
        fromDate: fromDate ? fromDate : "",
      })
      .then((res) => {
        setData(res.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [toDate, fromDate, machine]);

  console.log(reformatDate(fromDate), reformatDate(toDate));
  return (
    <div className="p-5 ">
      <h1 className=" font-bold text-3xl">Filter:</h1>
      <div className=" flex-wrap py-2 flex justify-between align-middle content-center self-center items-center">
        <div>
          {deviceList &&
            deviceList.map((el) => (
              <button
                className={`p-2 border-[1px] border-indigo-200 shadow-md font-medium text-lg px-10 m-4 rounded-md ${
                  machine === el ? " text-white bg-blue-300" : ""
                } `}
                key={el}
                onClick={() => setMachine(el)}>
                {el}
              </button>
            ))}
        </div>
        <div>
          <label htmlFor="">To</label>
          <input
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border-[1px] border-indigo-200 shadow-md font-medium text-lg  m-4 rounded-md"
            type="datetime-local"></input>
        </div>

        <div>
          <label htmlFor="">From</label>
          <input
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border-[1px] border-indigo-200 shadow-md font-medium text-lg  m-4 rounded-md"
            type="datetime-local"></input>
        </div>
      </div>
    </div>
  );
};

export default Filter;
