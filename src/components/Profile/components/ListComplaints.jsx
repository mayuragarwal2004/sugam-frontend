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
            const text = new TextDecoder().decode(value)
            if (isJsonString(text)) {
              console.log(JSON.parse(text));
              setData(JSON.parse(text));
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

  console.log({ data });

  return (
    <div className="categories">
      {data &&
        data.length > 0 &&
        data.map((carddata, i) => <Card data={carddata} key={i} />)}
    </div>
  );
};

export default ListComplaints;
