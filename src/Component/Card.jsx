import React from "react";

const Card = ({ value, title }) => {
  return (
    <div className="p-3 dark:bg-[#2C394B]  rounded-md shadow-md  bg-[#FBFBFB]">
      <h1 className=" font-bold dark:text-slate-300 text-gray-600 text-lg">
        {title}
      </h1>
      <span className=" dark:text-white text-2xl p-2">{value}</span>
    </div>
  );
};

export default Card;
