import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Analytics from "./components/Analytics";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="home-container">
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route index element={<Home />} /> */}
              {/* <Route path="about" element={<About />} /> */}
              {/* <Route path="" element={<RequireAuth />}> */}
              <Route path="analytics" element={<Analytics />} />
              {/* </Route> */}
              {/* <Route path="form" element={<Form />} /> */}
              {/* <Route path="dashboard" element={<Dashboard />} /> */}
              {/* <Route path="auth" element={<LoginSignUp />} /> */}
              {/* <Route path="complaints" element={<Complaints />} /> */}
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              {/* <Route path="aboutUs" element={<AboutUs />} /> */}
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
