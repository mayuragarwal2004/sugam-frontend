import React from 'react';
import Card from "../Dashboard/DashboardComponents/components/card";
import General from "../Dashboard/DashboardComponents/General";

const index = () => {
  return (
    <div
      className="div-carduser"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: "5%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        background: "rgb(160 216 200 / 100%)",
      }}
    >
    <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)` }}
        >
          <div style={{color:"green",fontSize:"40px",textAlign:"justify"}}>Bhavesh Agone here</div>
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
            <p className=" font-normal text-gray-600" style={{fontSize:"60px"}}>
              101
            </p>
          </div>
        </div>
      </Card>

      <Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)` }}
        >
          <div style={{color:"green",fontSize:"40px",textAlign:"justify"}}>Bhavesh Agone here</div>
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
            <p className=" font-normal text-gray-600" style={{fontSize:"60px"}}>
              101
            </p>
          </div>
        </div>
      </Card><Card
        extra={"items-center w-full h-full p-[16px] bg-cover"}
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(images.jpeg)` }}
        >
          <div style={{color:"green",fontSize:"40px",textAlign:"justify"}}>Bhavesh Agone here</div>
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
            <p className=" font-normal text-gray-600" style={{fontSize:"60px"}}>
              101
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default index