import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const WardAlert = () => {
  const [queryData, setqueryData] = useState([
    {
      location: "NOT IN WARD",
      complete: 0,
      pending: 5,
    },
  ]);

  const alertValue = {
    0: "#008000c2", // green
    6: "orange",
    12: "#ff4343", //red
    1000000: "#ff4343", //red
  };

  const getColor = (num) => {
    console.log(Object.keys(alertValue).reverse());
    let arr = Object.keys(alertValue);
    for (let i = 0; i < arr.length-1; i++) {
        console.log(arr[i]);
        if (num>=arr[i] && num<arr[i+1]){
            console.log(alertValue[arr[i]]);
            return alertValue[arr[i]];
        }
    }
  };

  const getNewData = () => {
    const status = [];
    const locations = [];
    const severity = [];
    const wasteType = [];
    var time1 = dayjs("1901-12-13");
    var time2 = dayjs();
    status.push("COMPLETE");
    status.push("PENDING");

    time1 = time1.startOf("day").toISOString();
    time2 = time2.endOf("day").toISOString();

    console.log({ time1, time2 });

    severity.push("LOW");
    severity.push("MEDIUM");
    severity.push("HIGH");

    wasteType.push("DRY");
    wasteType.push("WET");
    wasteType.push("CONSTRUCTION");
    wasteType.push("PLANT");
    wasteType.push("CLOTHES");
    wasteType.push("MEDICAL");
    wasteType.push("SANITARY");

    const reqbody = {
      status: status,
      time1,
      time2,
    };
    if (severity.length > 0) reqbody.severity = severity;
    if (locations.length > 0) reqbody.locations = locations;
    if (wasteType.length > 0) reqbody.wasteType = wasteType;
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;

    console.log({ reqbody });

    fetch("/java/api/adminspace/getComplaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setqueryData(groupByLocation(data));
          console.log({ data });
        }
      });
  };

  function groupByLocation(data) {
    const result = {};

    data.forEach((item) => {
      if (!result[item.location]) {
        result[item.location] = {
          location: item.location,
          complete: 0,
          pending: 0,
        };
      }

      if (item.status === "COMPLETE") {
        result[item.location].complete += 1;
      } else if (item.status === "PENDING") {
        result[item.location].pending += 1;
      }
    });

    return Object.values(result);
  }

  useEffect(() => getNewData(), []);

  console.log({ queryData });

  return (
    <div>
      <div className="worker-table">
        <table>
          <thead>
            <tr>
              <th>Ward Name</th>
              <th>Complaints Resolved</th>
              <th>Complaints Pending</th>
              <th>Total Complaints</th>
            </tr>
          </thead>
          <tbody>
            {queryData.map((doc, i) => (
              <tr key={i}>
                <td>{doc.location}</td>
                <td>{doc.complete}</td>
                <td style={{ backgroundColor: getColor(doc.pending) }}>
                  {doc.pending}
                </td>
                <td>{doc.complete + doc.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardAlert;
