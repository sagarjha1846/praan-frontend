import { DatePicker } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const Filter = ({
  setUserLogged,
  setToDate,
  setFromDate,
  machine,
  setMachine,
}) => {
  const deviceList = ["p1", "p25", "p10", "Upload CSV"];
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  const onChange = (range) => {
    const valueOfInput1 = range[0].format("YY/MM/DD,HH:mm:ss");
    const valueOfInput2 = range[1].format("YY/MM/DD,HH:mm:ss");
    setFromDate(valueOfInput1);
    setToDate(valueOfInput2);
  };
  return (
    <div className="w-full p-0 ">
      <h1 className="mb-4 dark:text-white font-bold text-2xl px-4 py-4">
        Welcome Sagar
      </h1>
      <div className="pl-4">
        <h1 className="mb-4 dark:text-slate-200 text-gray-600 text-lg">
          Select Device
        </h1>
        <div className="pl-4 mb-4 flex-col flex w-full">
          {deviceList &&
            deviceList.slice(0, deviceList.length - 1).map((el) => (
              <button
                onClick={() => setMachine(el)}
                className={`mb-4 w-full ${
                  machine === el
                    ? "dark:bg-[#FF4C29] bg-blue-800  text-white font-bold"
                    : "text-black dark:text-white font-semibold"
                } p-2 rounded-l-md  align-middle text-left px-3 hover:bg-blue-800 hover:text-white hover:font-bold dark:hover:bg-[#FF4C29] `}>
                {el}
              </button>
            ))}
        </div>
      </div>
      <div className="pl-4">
        <h1 className="mb-2 dark:text-slate-200 text-gray-600 text-lg">
          Select Date Range
        </h1>
        <div className="p-2 mb-4 flex-col flex w-full">
          <div className="p-2">
            <RangePicker
              onChange={onChange}
              showTime={{ format: "HH:mm:ss" }}
              className="p-2 w-full text-white  dark:!text-white !font-pop"
              disabled={[false, false]}
              format="YY/MM/DD,HH:mm:ss"
            />
          </div>
        </div>
      </div>
      <div className="pl-4">
        <h1 className="mb-4 dark:text-slate-200  text-gray-600 text-lg">
          Add new data
        </h1>
        <div className="pl-4 mb-4 flex-col flex w-full">
          {deviceList &&
            deviceList.slice(deviceList.length - 1).map((el) => (
              <button
                onClick={() => setMachine(el)}
                className={`mb-4 w-full ${
                  machine === el
                    ? "dark:bg-[#FF4C29] bg-blue-800  text-white font-bold"
                    : "text-black dark:text-white font-semibold"
                } p-2 rounded-l-md  align-middle text-left px-3 hover:bg-blue-800 hover:text-white hover:font-bold dark:hover:bg-[#FF4C29]`}>
                {el}
              </button>
            ))}
        </div>
      </div>
      <div className="pl-4">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
            setUserLogged(false);
          }}
          className={` w-[80%] mx-4 font-bold bg-[#FF4C29]  p-2 rounded-md  align-middle text-center hover:bg-blue-800 text-white hover:font-bold dark:hover:bg-[#FF4C29]`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Filter;
