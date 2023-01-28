import React from "react";
import { reformatDate } from "../util/helper";
const Filter = ({
  toDate,
  setToDate,
  setFromDate,
  fromDate,
  machine,
  setMachine,
}) => {
  const deviceList = ["p1", "p25", "p10"];

  return (
    <div className="w-full">
      <div className="">
        <h1 className="mb-5 font-bold text-2xl">Filter:</h1>

        <div className=" bg-white border-[1px] w-[90%] rounded-md flex justify-evenly">
          {deviceList &&
            deviceList.map((el) => (
              <button
                className={`p-2  border-grey-200 shadow-md font-medium text-lg w-full ${
                  machine === el ? " text-white rounded-md bg-blue-300" : ""
                } `}
                key={el}
                onClick={() => setMachine(el)}>
                {el}
              </button>
            ))}
        </div>
      </div>
      <div className="flex-wrap w-full py-2 flex justify-around align-middle content-center self-center items-center">
        <div className="my-5  flex flex-col  w-full">
          <h1 className=" text-left   font-bold text-2xl">
            Date Range Filter:
          </h1>
        </div>
      </div>
      <div>
        <div className=" ">
          <label className="font-bold" htmlFor="">
            To
          </label>
          <input
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border-[1px] border-grey-200 shadow-md font-medium text-lg  m-4 rounded-md"
            type="datetime-local"></input>
        </div>

        <div className="  ">
          <label className="font-bold" htmlFor="">
            From
          </label>
          <input
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border-[1px] border-grey-200 shadow-md font-medium text-lg  m-4 rounded-md"
            type="datetime-local"></input>

          <button
            className=" p-2  text-white border-grey-200 shadow-md font-medium text-lg mb-5  bg-blue-700 rounded-md"
            htmlFor=""
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}>
            Clear date
          </button>
        </div>

        <div className="my-5 w-full ">
          <h1 className="font-bold text-2xl w-full py-4">Current Filters</h1>
          {fromDate && (
            <h1 className="font-bold mb-5 text-black" htmlFor="">
              From<span className="pl-5">-</span>
              <span className="pl-5 text-gray-800">
                {reformatDate(fromDate)}
              </span>
            </h1>
          )}
          {toDate && (
            <h1 className="font-bold mb-5 text-black" htmlFor="">
              To<span className="pl-5">-</span>
              <span className="pl-5 text-gray-800">{reformatDate(toDate)}</span>
            </h1>
          )}
          {machine && (
            <h1 className="font-bold mb-5 text-black" htmlFor="">
              Current Device<span className="pl-5">-</span>
              <span className="pl-5 text-gray-800">{machine}</span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
