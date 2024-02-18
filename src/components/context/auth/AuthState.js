// import React from "react";
import React, { useContext, createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { auth } from "../../../base";

const AuthState = (props) => {
  const [currentUser, setcurrentUser] = useState(0);
  const [currentUserRole, setcurrentUserRole] = useState();

  console.log({ currentUser, currentUserRole });

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const getUserData = () => {
    fetch("/sugam/api/get")
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
            console.log(data);
            if (data && data.userID) {
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
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  useEffect(() => {
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;
    getUserData();
  }, []);

  const value = { currentUser, currentUserRole };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthState;
