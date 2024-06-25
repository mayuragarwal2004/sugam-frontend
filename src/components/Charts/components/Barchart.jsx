import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { isJsonString } from "../../../utilityFunctions";

const Barchart = () => {
  const chartRef = useRef(null);

  async function loadBarData() {
    let newdata = [];
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
          console.log({ hickeck: responseData });
          newdata = [
            responseData?.WET,
            responseData?.PLANT,
            responseData?.CONSTRUCTION,
            responseData?.CLOTHES,
            responseData?.DRY,
            responseData?.MEDICAL,
            responseData?.SANITARY,
          ];

          const options = {
            series: [
              {
                data: newdata,
              },
            ],
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                horizontal: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            yaxis: {
              categories: [
                "Wet Waste",
                "Plant Waste",
                "Construction Waste",
                "Clothes",
                "Dry Waste",
                "Medical Waste",
                "Sanitary Waste",
              ],
            },
          };

          const chart = new ApexCharts(chartRef.current, options);
          chart.render();
        });
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    } finally {
      return newdata;
    }
  }

  useEffect(() => {
    loadBarData();
  }, []);

  return <div id="chart" ref={chartRef}></div>;
};

export default Barchart;
