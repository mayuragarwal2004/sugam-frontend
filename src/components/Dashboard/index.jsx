import React, { useState } from "react";
import { useAuth } from "./context/auth/AuthState";
// import ArrowForwardIosIcon from '@mui/';
import "./css/dashboard.css";
import UserDashboard from "./DashboardComponents/UserDashboard";
import OfficerDashboard from "./DashboardComponents/Officerdashboard";
import SubOfficerDashboard from "./DashboardComponents/SubOfficerdashboard";
import SupervisorDashboard from "./DashboardComponents/Supervisordashboard";
import WorkerDashboard from "./DashboardComponents/Workerdashboard";
import AdminDashboard from "./DashboardComponents/Admindashboard";
import MyAvatar from "./MyAvatar";
import AddRole from "./DashboardComponents/AddRole";

const avatarColors = [
  "D28100",
  "D1423F",
  "DC1677",
  "C233A0",
  "6163E1",
  "246DB6",
  "008290",
  "7BA100",
  "9355D2",
  "627A89",
];
const currentAvatarColor =
  "#" + avatarColors[Math.floor(Math.random() * avatarColors.length)];

const Dashboard = () => {
  const { currentUser, currentUserRole } = useAuth();
  const [switchUser, setSwitchUser] = useState(false);
  const handleClickold = () => {
    console.log("clicked");
    // fetch("/api").then(
    // response => console.log(response)
    // )hi
  };

  console.log(switchUser);

  if (!Boolean(currentUser)) {
    return null;
  }

  return (
    <>
      <div className="home-agenda section-container">
        <div className="home-max-width2 max-content-container">
          <div className="home-heading-container1">
            <h1 className="home-text11 heading2">Dashboard</h1>
          </div>
          <div className="dashboard-container">
            <div className="dashboard-header">
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span className="dashboard-header-greeting">
                  Hi {currentUser?.displayName}
                </span>
                <span className="dashboard-header-role">Admin</span>
              </span>
              <div className="dashboard-header-right">
                {currentUser && (
                  <MyAvatar currentAvatarColor={currentAvatarColor} />
                )}
                <button
                  className="dashboard-switch-user"
                  onClick={() => setSwitchUser((prev) => !prev)}
                >
                  Switch to User
                </button>
              </div>
            </div>
            {currentUserRole === "" && <UserDashboard />}
            {currentUserRole === "Officer" && <OfficerDashboard />}
            {currentUserRole === "SubOfficer" && <SubOfficerDashboard />}
            {currentUserRole === "Supervisor" && <SupervisorDashboard />}
            {currentUserRole === "Worker" && <WorkerDashboard />}
            {currentUserRole === "Admin" && <AdminDashboard />}

            {/* <button onClick={handleClickold}>Hello</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
