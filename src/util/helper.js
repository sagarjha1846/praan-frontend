export const reformatDate = (date) => {
  if (date)
    return (
      date?.split("T")[0].replaceAll("-", "/") +
      "," +
      date.split("T")[1].replaceAll("-", "/") +
      ":00"
    ).slice(2);
};
