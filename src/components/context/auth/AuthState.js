// import React from "react";
import React, { useContext, createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { auth } from "../../../base";
import { isJsonString } from "../../../utilityFunctions";

const AuthState = (props) => {
  const [currentUser, setcurrentUser] = useState(0);
  const [currentUserRole, setcurrentUserRole] = useState();

  console.log({ currentUser, currentUserRole });

  const getUserData = () => {
    fetch("/java/api/userspace/get")
      .then((response) => {
        console.log(response);
        if (response.status > 200) {
          setcurrentUser(null);
          return;
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
          .then((data) => {
            console.log(data);
            if (data && data.username) {
              setcurrentUser(data);
              if (data.status) {
                setcurrentUserRole(data.status);
              }
            } else {
              setcurrentUser(null);
            }
          });
      })
      .catch((error) => {
        setcurrentUser(null);
        // console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  useEffect(() => {
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;
    getUserData();
  }, []);

  const value = { currentUser, currentUserRole, getUserData };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthState;
