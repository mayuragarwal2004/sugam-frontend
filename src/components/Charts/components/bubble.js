import React, { useEffect, useState } from "react";
import {Bubble  } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { isJsonString } from "../../../utilityFunctions";
Chart.register(...registerables);

function BubbleChart() {
    const [data, setData] = useState({
        
        datasets: [
            {
                label: "Complaints Bubble Chart",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
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
        async function loadPieData() {
            try {
                const response = await fetch("/sugam/charts/bubble", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                response.body
                .getReader()
                .read()
                .then(({ value, done }) => {
                    console.log(new TextDecoder().decode(value));
                    console.log({ value });
                    if (isJsonString(new TextDecoder().decode(value))) {
                        return JSON.parse(new TextDecoder().decode(value));
                    }
                    return "";
                })
                .then((responseData) => {
                    console.log(responseData);
                    setData((prevData) => ({
                        ...prevData,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: responseData,
                            },
                        ],
                    }));
                });

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        loadPieData();
    }, []);

    return (
        <div>
            <div>
                <Bubble data={data} />
            </div>
        </div>
    );
}

export default BubbleChart;
