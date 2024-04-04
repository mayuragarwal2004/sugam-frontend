import React, { useEffect, useState } from "react";
import Card from "./Card";
import { isJsonString } from "../../../utilityFunctions";

const ListComplaints = () => {
  const [data, setData] = useState({});

  const getUserData = () => {
    fetch("/sugam/user/getIssues")
      .then((response) => {
        console.log(response);
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            console.log(new TextDecoder().decode(value));
            console.log({ value });
            if (isJsonString(new TextDecoder().decode(value))) {
              setData(JSON.parse(new TextDecoder().decode(value)));
            }
            return;
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
    <div className="categories">
      {data &&
        data.length > 0 &&
        data.map((carddata) => <Card data={carddata} />)}
    </div>
  );
};

export default ListComplaints;
