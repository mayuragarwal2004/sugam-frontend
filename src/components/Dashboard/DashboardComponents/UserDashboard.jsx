import React, {useState, useEffect} from "react";
import { db } from "../base";
import { useAuth } from "../context/auth/AuthState";
import {
  getFirestore,
  addDoc,
  collection,
  where,
  query,
  getCountFromServer,
  getDoc,
  doc,
} from "firebase/firestore";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [complaintNum, setComplaintNum] = useState({totalComplaintsNum:"--", averageDaysNum:"--", complaintsResolvedNum:"--", complaintsPendingNum:"--"})
  async function getcomplaintcount() {

    const totalComplaintsNumQuery = query(
      collection(db, "Complaints"),
      where("useruid", "==", currentUser.uid)
    );
    const totalComplaintsNum = await getCountFromServer(totalComplaintsNumQuery);

    const complaintsResolvedQuery = query(
      collection(db, "Complaints"),
      where("useruid", "==", currentUser.uid),
      where("resolved", "==", true)
    );
    const complaintsResolved = await getCountFromServer(complaintsResolvedQuery);

    const averageDays = await getDoc(doc(db, "UserData", currentUser.uid));

    setComplaintNum(prev=>({...prev,totalComplaintsNum:totalComplaintsNum.data().count, averageDaysNum: averageDays.data().averageDaysNum, complaintsResolvedNum:complaintsResolved.data().count, complaintsPendingNum:totalComplaintsNum.data().count-complaintsResolved.data().count}))
    // console.log(querySnapshot.data().count);
  }
  useEffect(() => {
    getcomplaintcount();
  }, [])
  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-body-card-container">
          <div className="dashboard-body-card-container-parent">
            <div className="dashboard-body-card-container-child">
              <div className="dashboard-body-card">
                <div className="dashboard-body-card-number">{complaintNum.averageDaysNum}</div>
                <div className="dashboard-body-card-text">
                  Average number of day per complaint resolved
                </div>
              </div>
              <div className="dashboard-body-card">
                <div className="dashboard-body-card-number">{complaintNum.totalComplaintsNum}</div>
                <div className="dashboard-body-card-text">
                  No. of complaints
                </div>
              </div>
            </div>
            <div className="dashboard-body-card-container-child">
              <div className="dashboard-body-card">
                <div className="dashboard-body-card-number">{complaintNum.complaintsResolvedNum}</div>
                <div className="dashboard-body-card-text">
                  Complaints resolved
                </div>
              </div>
              <div className="dashboard-body-card">
                <div className="dashboard-body-card-number">{complaintNum.complaintsPendingNum}</div>
                <div className="dashboard-body-card-text">
                  Complaints pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
