import React, { useEffect, useState } from "react";
import Card from "../Dashboard/DashboardComponents/components/card";
import General from "../Dashboard/DashboardComponents/General";
import Bubblechart from "./components/bubble";
import PieChart from "./components/center.pie";
import Line_res_tot from "./components/line.res.tot";
import BarChart_w from "./components/types.of.w.bar";
import { Bubble } from "react-chartjs-2";
import PieApexCharts from "./components/PieApexCharts";

const Charts = () => {
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [number3, setNumber3] = useState(null);
  // console.log({number1},{number2},{number3});
  useEffect(() => {
    fetch("/java/api/analytics/issues").then((response) => {
      // console.log(response);
      response.body
        .getReader()
        .read()
        .then(({ value, done }) => {
          const decodedValue = new TextDecoder().decode(value);
          console.log({ decodedValue });
          console.log({ value });
          if (isJsonString(decodedValue)) {
            const data = JSON.parse(decodedValue);
            console.log({ newdata: data });
            setNumber1(data?.TOTAL || 0);
            setNumber2(data?.COMPLETE || 0);
            setNumber3(data?.PENDING || 0);
          }
        });
    });
  }, []);

  return (
    <>
      <div
        className="div-carduser"
        style={{
          paddingTop: "20px",
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          // padding: "3px",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          background: "rgb(160 216 200 / 100%)",
          alignItems: "center",
        }}
      >
        {/* Total Card */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            // maxWidth: "15%",
            width: "190px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: "250px",
          }}
        >
          {/* Background and profile */}
          <div
            className="relative mt-1 flex h16 w-full justify-center rounded-xl bg-cover"
            // style={{ backgroundImage: `url(images.jpeg)` }}
          >
            <div
              style={{ color: "green", fontSize: "30px", textAlign: "justify" }}
            >
              Total
            </div>
          </div>

          {/* Post followers */}
          <div
            className="mb-3 mt-6 profile-div md:!gap-14"
            style={{
              gap: "4px",
              ...(window.innerWidth <= 400 && { display: "block" }),
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {/* {userData && userData.Complete + userData.Pending} */}
              </p>
              <p
                className="text-2xl font-bold text-navy-700 dark:text-white"
                style={{ fontSize: "50px" }}
              >
                {number1}
              </p>
            </div>
          </div>
        </Card>
        {/* Resolved Card */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            width: "190px",
            // maxWidth: "15%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: "250px",
          }}
        >
          {/* Background and profile */}
          <div
            className="relative mt-1 flex h16 w-full justify-center rounded-xl bg-cover"
            // style={{ backgroundImage: `url(images.jpeg)` }}
          >
            <div
              style={{ color: "green", fontSize: "30px", textAlign: "justify" }}
            >
              Resolved
            </div>
          </div>

          {/* Post followers */}
          <div
            className="mb-3 mt-6 profile-div md:!gap-14"
            style={{
              gap: "4px",
              ...(window.innerWidth <= 400 && { display: "block" }),
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {/* {userData && userData.Complete + userData.Pending} */}
              </p>
              <p
                className="text-2xl font-bold text-navy-700 dark:text-white"
                style={{ fontSize: "50px" }}
              >
                {number2}
              </p>
            </div>
          </div>
        </Card>
        {/* Pending Card */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            width: "190px",
            // maxWidth: "15%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: "250px",
          }}
        >
          {/* Background and profile */}
          <div
            className="relative mt-1 flex h16 w-full justify-center rounded-xl bg-cover"
            // style={{ backgroundImage: `url(images.jpeg)` }}
          >
            <div
              style={{ color: "green", fontSize: "30px", textAlign: "justify" }}
            >
              Pending
            </div>
          </div>

          {/* Post followers */}
          <div
            className="mb-3 mt-6 profile-div md:!gap-14"
            style={{
              gap: "4px",
              ...(window.innerWidth <= 400 && { display: "block" }),
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-navy-700 dark:text-white">
                {/* {userData && userData.Complete + userData.Pending} */}
              </p>
              <p
                className="text-2xl font-bold text-navy-700 dark:text-white"
                style={{ fontSize: "50px" }}
              >
                {number3}
              </p>
            </div>
          </div>
        </Card>
        {/* Bar Chart */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            width: "fit-content",
            // minWidth: "30%",
            minHeight: "240px",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: "250px",
            margin: "10px",
          }}
        >
          <BarChart_w />
        </Card>
        {/* Pie Chart */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            width: "fit-content",
            display: "flex",
            backgroundColor: "#fff",
            overflow: "auto",
            margin: "10px",
          }}
        >
          <PieChart />
          {/* <PieApexCharts /> */}
        </Card>

        {/* line chart */}
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            width: "fit-content",
            maxHeight: "350px",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            overflow: "auto",
          }}
        >
          <Line_res_tot />
        </Card>
      </div>
      {/* <div
        className="chartsdisplay"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "auto",
          padding: "2px",
          background: "rgb(160 216 200 / 100%)",
        }}
      >
        <Card
          extra={"items-center w-full h-full p-[16px] bg-cover"}
          style={{
            maxWidth: "88%",
            margin: "10px",
            width: "calc(100% - 20px)",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <Bubblechart></Bubblechart>
        </Card>
      </div> */}
    </>
  );
};

export default Charts;
