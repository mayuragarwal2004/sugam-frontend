import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import Complaints from "./components/Complaints";
import AboutUs from "./components/Aboutus";
import ListComplaints from "./components/Profile/components/ListComplaints";
import TrackComplaint from "./components/TrackComplaint";
import Charts from "./components/Charts";
import Barchart from "./components/Charts/components/Barchart";
import Bubble from "./components/Charts/components/bubble";
import NoPage from "./NoPage";
import Root from "./components/Root/Root";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="home-container">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* <Route path="about" element={<About />} /> */}
              <Route path="" element={<RequireAuth />}>
                <Route path="root" element={<Root />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/complaints" element={<ListComplaints />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="track" element={<TrackComplaint />} />
              </Route>
              {/* <Route path="form" element={<Form />} /> */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* <Route path="auth" element={<LoginSignUp />} /> */}
              <Route path="testing" element={<Bubble />} />
              <Route path="login" element={<Login />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="charts" element={<Charts />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/barchart" element={<Barchart />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
