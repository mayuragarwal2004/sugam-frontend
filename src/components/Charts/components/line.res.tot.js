import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function Line_res_tot() {
    //     let Resolved = []; // Define Resolved as an empty array
    // let Total = [];
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const [data, setData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                label: "Resolved",
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
            {
                label: "Total",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(54, 162, 235, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(54, 162, 235, 1)",
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
                const response = await fetch("/sugam/charts/res_tot", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // if (!response.ok) {
                //     throw new Error("Network response was not ok");
                // }


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
                        var resolved = [];
                        var total = [];
                        responseData.map(item => {
                            resolved.push(item.resolved);
                            total.push(item.total);
                        })
                        resolved.reverse();
                        total.reverse();
                        setData((prevData) => ({
                            ...prevData,
                            labels: [...prevData.labels],
                            datasets: [
                                {
                                    ...prevData.datasets[0],
                                    data: resolved,
                                },
                                {
                                    ...prevData.datasets[1],
                                    data: total,
                                },
                            ],
                        }));
                    });



            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        console.log(data); // Check the state data

        loadPieData();

    }, []);

    console.log({ data });

        return (
            <div>
                <div style={{height:'300px',width:'600px'}}>
                    <Line data={data} />
                </div>
            </div>
        );
    }
        
    export default Line_res_tot; 
