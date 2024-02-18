import React, { useEffect, useState } from "react";
import Card from "../../Dashboard/DashboardComponents/components/card";

const ListComplaints = () => {
  const [data, setData] = useState({});
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const getUserData = () => {
    fetch("/sugam/")
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

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.map((carddata) => <Card data={carddata} />)}
    </div>
  );
};

export default ListComplaints;
