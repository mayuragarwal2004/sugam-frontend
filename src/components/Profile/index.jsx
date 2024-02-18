import React, { useEffect, useState } from "react";
// import avatar from "assets/img/avatars/avatar11.png";
// import banner from "../../public/banner.png";
import Card from "../Dashboard/DashboardComponents/components/card";
import General from "../Dashboard/DashboardComponents/General";
import { useAuth } from "../context/auth/AuthState";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../base";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();
  // const currentUser = { displayName: "Sugam User" };
  const [userData, setUserData] = useState({
    Complete: 6,
    Pending: 19,
  });

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  async function getUserData() {
    ///sugam/user/getIssueSum
    fetch("/sugam/user/getIssueSum")
      .then((response) => {
        console.log(response);
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
          .then((data) => {
            console.log({ newdata: data });
            setUserData(data);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  }

  useEffect(() => {
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;
    getUserData();
  }, []);

  return (
    <div
      className="div-carduser"
      style={{
        padding: "20%",
        paddingRight: "20%",
        paddingTop: "3%",
        paddingBottom: "10%",
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
          style={{ backgroundImage: `url(banner.png)` }}
        >
          <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
            {/* <img className="h-full w-full rounded-full" src={avatar} alt="" /> */}
          </div>
        </div>

        {/* Name and position */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-xl font-bold text-navy-700">
            {currentUser.username}
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
              {userData && userData.Complete + userData.Pending}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Compaints Registered
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.Complete}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Complaints Solved
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.Pending}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Complaints pending
            </p>
          </div>
        </div>
      </Card>
      <div className="generalinfo" style={{ paddingTop: "40px" }}>
        {userData && <General apiKey="kl" />}
      </div>
    </div>
  );
};

export default Profile;
