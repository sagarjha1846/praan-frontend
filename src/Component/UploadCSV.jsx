import { Input, Upload, Button, message } from "antd";
import React from "react";

const UploadCSV = () => {
  const props = {
    name: "file",
    action: "http://localhost:4000/device/upload-data",
    multiple: false,
    accept: ".csv",
    maxCount: 1,
    headers: {
      authorization: "authorization-text",
    },
  };

  function onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  return (
    <div className="w-full dark:bg-[#2C394B] bg-[#FBFBFB] shadow-md rounded-md p-5">
      <h1 className="text-2xl dark:text-slate-200 font-bold mb-5">
        Upload A CSV File:
      </h1>
      <div className="">
        <Upload
          {...props}
          className=" w-full !font-pop"
          type="file"
          onChange={onChange}>
          <Button className="  font-bold dark:bg-white font-pop flex">
            <span className="font-bold font-pop pr-4 dark:bg-white  ">+</span>
            Upload Your file here
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default UploadCSV;
