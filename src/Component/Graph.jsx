import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
const Graph = ({ data, machine }) => {
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
    },
    title: {
      text: `${machine} Vs Time`,
      align: "left",
    },
    data: {
      parseDate: Date.parse,
    },

    xAxis: {
      type: "category",
      labels: {
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
      title: {
        text: "Exchange rate",
      },
    },
    legend: {
      enabled: false,
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
    <div>
      <h1 className="text-2xl font-bold">Graph:</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
