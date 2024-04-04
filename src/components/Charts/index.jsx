import React, { useEffect, useState } from 'react';
import Card from "../Dashboard/DashboardComponents/components/card";
import General from "../Dashboard/DashboardComponents/General";
import Bubblechart from "./components/bubble";
import PieChart from "./components/center.pie";
import Line_res_tot from "./components/line.res.tot";
import BarChart_w from "./components/types.of.w.bar";
import { Bubble } from 'react-chartjs-2';

const Index = () => {
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
 
  fetch('/sugam/charts/res_tot')
      .then((response) => {
          // console.log(response);
          response.body
              .getReader()
              .read()
              .then(({ value, done }) => {
                  const decodedValue = new TextDecoder().decode(value);
                  console.log(decodedValue);
                  console.log({ value });
                  if (isJsonString(decodedValue)) {
                    const data = JSON.parse(decodedValue)[0];
                    console.log({ data });
                    setNumber1(data.total); 
                    setNumber2(data.resolved); 
                    setNumber3(data.pending); 
                  }
              }); 
      });
}, []);

  return (
    <>
    <div
      className="div-carduser"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        gap: '10px',
        padding: "3px",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        background: "rgb(160 216 200 / 100%)",
      }}
    >
    <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          maxWidth: "15%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "250px",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)`,height:'80px' }}
        >
          <div style={{color:"green",fontSize:"20px",textAlign:"justify"}}>Bhavesh Agone here</div>
        </div>

        {/* Name and position */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700">
            {/* {currentUser.username} */}
          </h4>
          {/* <p className="text-base font-normal text-gray-600">Product Manager</p> */}
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
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    {number1}
                </p>
          </div>
        </div>
      </Card>

      <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          maxWidth: "15%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "250px",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)`,height:'80px' }}
        >
          <div style={{color:"green",fontSize:"20px",textAlign:"justify"}}>Bhavesh Agone here</div>
        </div>

        {/* Name and position */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700">
            {/* {currentUser.username} */}
          </h4>
          {/* <p className="text-base font-normal text-gray-600">Product Manager</p> */}
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
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    {number2}
                </p>
          </div>
        </div>
      </Card><Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          maxWidth: "15%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "250px",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)`,height:'80px' }}
        >
          <div style={{color:"green",fontSize:"20px",textAlign:"justify"}}>Bhavesh Agone here</div>
        </div>

        {/* Name and position */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700">
            {/* {currentUser.username} */}
          </h4>
          {/* <p className="text-base font-normal text-gray-600">Product Manager</p> */}
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
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    {number3}
                </p>
          </div>
        </div>
      </Card>
      <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          minWidth:'30%',
          minHeight:'240px',
          maxWidth:'38%',
          // maxWidth:'600px',
          // justifyContent: 'space-around',
          // margin:'10px',
          width: 'calc(100% - 20px)',
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "250px",
        }}
      >
        <BarChart_w></BarChart_w>        
      </Card>
      
    </div>
    <div className="chartsdisplay" style={{display:'flex',flexWrap:'wrap',justifyContent: 'center',overflow:'auto',padding:'2px', background: "rgb(160 216 200 / 100%)"}}>

    <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          maxWidth:'30%',
          margin:'10px',
          width: 'calc(100% - 20px)',
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
       <PieChart></PieChart>
      </Card>

      <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          maxWidth:'60%',
          maxHeight:'350px',
          margin:'10px',
          width: 'calc(100% - 20px)',
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Line_res_tot></Line_res_tot>
      </Card>

    <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
        maxWidth:'88%',
          margin:'10px',
          width: 'calc(100% - 20px)',
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Bubblechart></Bubblechart>
        
      </Card>
      
      
      
    </div>
    </>
  )
}

export default Index