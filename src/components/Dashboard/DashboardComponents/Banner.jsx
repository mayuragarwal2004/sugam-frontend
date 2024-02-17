import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import banner from "./banner.png";
import Card from "./components/card";
import General from "./General";
import { db } from "../../base";

const Banner = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = db.collection("users").doc("userid");
        const doc = await docRef.get();
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, []);

  console.log("hello");

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
        background:
          "linear-gradient(110.84deg, #fef3e8 1.01%, #bfebf4 102.07%)",
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
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {userData && userData.name}{" "}
            {/* Assuming "name" is a field in your document */}
          </h4>
          <p className="text-base font-normal text-gray-600">
            {userData && userData.position}
          </p>{" "}
          {/* Assuming "position" is a field in your document */}
        </div>

        {/* Post followers */}
        <div
          className="mt-6 mb-3 flex gap-5 md:!gap-14"
          style={{ flexwrap: "wrap", justifycontent: "center" }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.apiCalled}
            </p>{" "}
            {/* Assuming "apiCalled" is a field in your document */}
            <p className="text-sm font-normal text-gray-600">API called</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.apiCalledFails}
            </p>{" "}
            {/* Assuming "apiCalledFails" is a field in your document */}
            <p className="text-sm font-normal text-gray-600">API call failed</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
              {userData && userData.apiCalledSuccess}
            </p>{" "}
            {/* Assuming "apiCalledSuccess" is a field in your document */}
            <p className="text-sm font-normal text-gray-600">
              API call Success
            </p>
          </div>
        </div>
      </Card>
      <div className="generalinfo" style={{ paddingTop: "10%" }}>
        <General />
      </div>
    </div>
  );
};

export default Banner;
