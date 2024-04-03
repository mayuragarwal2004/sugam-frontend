import React, { useEffect, useState } from "react";
import { Pie,Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function BarChart_w() {
    const [data, setData] = useState({
        labels: ['Dry Waste', 'Plant Waste', 'Construction Waste', 'Wet Waste', 'Clothes','Sanitary Waste','Medical Waste'],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
        async function loadPieData() {
            try {
                const response = await fetch("/sugam/charts/bar_types", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: "",
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const responseData = await response.json();
                setData((prevData) => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: responseData,
                        },
                    ],
                }));
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        loadPieData();
    }, []);

    console.log({data});

    return (
        <div>
            <div>
                <Bar data={data} />
            </div>
        </div>
    );
}

export default BarChart_w;
