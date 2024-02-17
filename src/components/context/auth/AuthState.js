// import React from "react";
import React, { useContext, createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { auth } from "../../../base";

const AuthState = (props) => {
  const [currentUser, setcurrentUser] = useState();
  const [currentUserRole, setcurrentUserRole] = useState();

  console.log({ currentUser, currentUserRole });

  const getUserData = () => {
    fetch("/sugam/api/get")
      .then((response) => {
        console.log(response);
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            new TextDecoder().decode(value);
          })
          .then((data) => {
            console.log(data);
            setcurrentUser(data);
            if (data.staus) {
              setcurrentUserRole(data.staus);
            }
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here if needed
      });
  };

  useEffect(() => {
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
