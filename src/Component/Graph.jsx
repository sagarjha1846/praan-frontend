import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
const Graph = ({ data, machine, darkMode }) => {
  console.log(data, machine);
  const newData = data.map((el) => {
    return [
      "20" + el.t.replaceAll("/", "").replaceAll(",", "").replaceAll(":", ""),
      parseFloat(el[machine]),
    ];
  });

  const options = {
    chart: {
      zoomType: "x",
      backgroundColor: darkMode ? "#334756" : "",
    },
    title: {
      text: `${machine} Vs Time`,
      align: "left",
      style: {
        color: darkMode ? "#ffffff" : "",
      },
    },
    data: {
      parseDate: Date.parse,
    },

    xAxis: {
      type: "category",

      labels: {
        style: {
          color: darkMode ? "#ffffff" : "",
        },
        formatter: function () {
          var year = this.value.substring(0, 4);
          var month = this.value.substring(4, 6);
          var day = this.value.substring(6, 8);
          var hour = this.value.substring(8, 10);
          var min = this.value.substring(10, 12);
          var sec = this.value.substring(12, 14);
          return `${day}/${month}/${year}T${hour}:${min}:${sec}`;
        },
      },
    },
    yAxis: {
      labels: {
        style: {
          color: darkMode ? "#ffffff" : "",
        },
      },
      title: {
        text: `${machine} Value`,
        style: {
          color: "#ffffff",
        },
      },
    },
    legend: {
      enabled: false,
      style: {
        color: "#ffffff",
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        name: machine,
        data: [...newData],
      },
    ],
  };

  return (
    <div className="w-full dark:bg-[#334756] bg-[#FBFBFB] shadow-md rounded-md p-3">
      <h1 className="text-2xl dark:text-slate-200 font-bold m-4">Graph:</h1>
      <div className="m-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Graph;
