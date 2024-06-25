import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { isJsonString } from "../../../utilityFunctions";
Chart.register(...registerables);

function BarChart_w() {
  const [data, setData] = useState({
    labels: [
      "Wet Waste",
      "Plant Waste",
      "Construction Waste",
      "Clothes",
      "Dry Waste",
      "Medical Waste",
      "Sanitary Waste",
    ],
    datasets: [
      
      {
        label: "Types of Wastes (in %)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(128, 0, 0, 0.2)", // Maroon
        ],
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

  useEffect(() => {
    async function loadBarData() {
      try {
        const response = await fetch("/java/api/analytics/types", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            console.log(new TextDecoder().decode(value));
            console.log({ latestvalue: value });
            if (isJsonString(new TextDecoder().decode(value))) {
              return JSON.parse(new TextDecoder().decode(value));
            }
          })
          .then((responseData) => {
            // if(!Array.isArray(responseData)) return;
            console.log({ responseData });
            let newdata = [
              responseData?.WET,
              responseData?.PLANT,
                responseData?.CONSTRUCTION,
                responseData?.CLOTHES,
                responseData?.DRY,
                responseData?.MEDICAL,
                responseData?.SANITARY,
            ];

            setData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: newdata,
                },
              ],
            }));
          });
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }

    loadBarData();
  }, []);

  console.log({ data });

  return (
    <div style={{ minWidth: "400px" }}>
      <div>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default BarChart_w;
