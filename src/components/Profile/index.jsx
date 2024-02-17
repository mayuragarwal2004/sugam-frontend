import React, { useEffect, useState } from "react";
// import avatar from "assets/img/avatars/avatar11.png";
// import banner from "../../public/banner.png";
import Card from "./DashboardComponents/components/card";
import General from "./DashboardComponents/General";
import { useAuth } from "./context/auth/AuthState";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../base";
import "./Profile.css"

const Profile = () => {
  // const { currentUser } = useAuth();
  const currentUser = { displayName: "Sugam User" };
  const [userData, setUserData] = useState({
    apiCalledFails: 6,
    apiKey: "e4417de1-09fa-7b0d-184a-7bb2cf399a20",
    apiCalled: 19,
    apiCalledSuccess: 13,
  });

  async function getUserData() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
      // console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

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
            {currentUser.displayName}
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
              {userData && userData.apiCalled}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Compaints Registered
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.apiCalledSuccess}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Complaints Solved
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.apiCalledFails}
            </p>
            <p className="text-sm font-normal text-gray-600">
              Complaints pending
            </p>
          </div>
        </div>
      </Card>
      <div className="generalinfo" style={{ paddingTop: "40px" }}>
        {userData && <General apiKey={userData.apiKey} />}
      </div>
    </div>
  );
};

export default Profile;
