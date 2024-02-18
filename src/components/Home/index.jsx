import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import "./Home.css";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
  const [img, setimg] = useState(1);
  const [analyticdata, setanalyticdata] = useState({
    uniqueUsers: 0,
    complete: 0,
    workers: 0,
    complaints: 0,
  });
  function plusSlides(v) {
    console.log("clicked");
    if (img + v > 3) {
      setimg(1);
    } else if (img + v < 1) {
      setimg(3);
    } else {
      setimg(img + v);
    }
  }
  function currentSlide(v) {
    setimg(v);
  }

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const getAnalyticData = async () => {
    fetch("/sugam/api/footer")
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
            setanalyticdata(data);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (process.env.REACT_APP_FRONTEND_ONLY === "true") return;
    getAnalyticData();
  }, []);

  return (
    <>
      <div style={{ position: "relative", height: "60vh" }}>
        <div
          style={{
            backgroundImage: "url('background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            paddingLeft: "10%",
            color: "white",
            wordBreak: "break-word",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1 style={{ fontFamily: "initial", fontSize: "50px" }}>
            Welcome to SUGAM
          </h1>
          <br />
          <p>Get a step ahead toward clean city!!!</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div className="card-parent" style={{ color: "white" }}>
          <div className="icon">
            <MenuIcon />
          </div>
          <div className="title">Analytics</div>
        </div>
        <div className="card-parent" style={{ color: "white" }}>
          <div className="icon">
            <MenuIcon />
          </div>
          <div className="title">Complaint</div>
        </div>
        <div className="card-parent" style={{ color: "white" }}>
          <div className="icon">
            <MenuIcon />
          </div>
          <div className="title">Dashboard</div>
        </div>
      </div>
      <div>
        <div
          className="home-previous-events section-container"
          style={{ paddingtop: "250px" }}
        >
          <div className="home-max-width max-content-container">
            <div className="home-heading-container">
              <h1 className="home-text heading2">
                <span>
                  S<span className="greencolor">.</span>U
                  <span className="greencolor">.</span>G
                  <span className="greencolor">.</span>A
                  <span className="greencolor">.</span>M
                </span>
              </h1>
              <span className="home-text02" id="sugamabbv">
                <span className="greencolor">S</span>trategic identification of{" "}
                <span className="greencolor">U</span>rban garbage with{" "}
                <span className="greencolor">G</span>eospatial{" "}
                <span className="greencolor">A</span>nalysis and{" "}
                <span className="greencolor">M</span>onitoring
              </span>
            </div>
          </div>
          <div className="slideshow-container">
            <div
              className="mySlides fade"
              style={{ display: img === 1 ? "block" : "none" }}
            >
              {/* <div className="numbertext">1 / 3</div> */}
              <img src="slideimg1.jpeg" style={{ width: "100%" }} alt="img" />
            </div>
            <div
              className="mySlides fade"
              style={{ display: img === 2 ? "block" : "none" }}
            >
              {/* <div className="numbertext">2 / 3</div> */}
              <img src="slideimg2.jpeg" style={{ width: "100%" }} alt="img" />
            </div>
            <div
              className="mySlides fade"
              style={{ display: img === 3 ? "block" : "none" }}
            >
              {/* <div className="numbertext">3 / 3</div> */}
              <img src="slideimg3.jpeg" style={{ width: "100%" }} alt="img" />
            </div>
            <span className="prev" onClick={() => plusSlides(-1)}>
              <svg viewBox="0 0 1024 1024" className="home-icon">
                <path d="M250 176l92-90 426 426-426 426-92-90 338-336z"></path>
              </svg>
            </span>
            <span className="next" onClick={() => plusSlides(1)}>
              <svg viewBox="0 0 1024 1024" className="home-icon2">
                <path d="M250 176l92-90 426 426-426 426-92-90 338-336z"></path>
              </svg>
            </span>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <span
              className={img === 1 ? "dot" : "dot active"}
              onClick={() => currentSlide(1)}
            ></span>
            <span
              className={img === 2 ? "dot" : "dot active"}
              onClick={() => currentSlide(2)}
            ></span>
            <span
              className={img === 3 ? "dot" : "dot active"}
              onClick={() => currentSlide(3)}
            ></span>
          </div>
        </div>
      </div>
      <div className="home-workshops">
        <div className="home-content-container1">
          <div className="home-container1">
            <h1 className="home-text12">
              <span className="home-text13">Complain</span>
              <br />
              <span>Here</span>
              <br />
            </h1>
            <span className="home-text17">
              Please report open garbage dumps near you
            </span>
            <span className="home-text18">
              Your Complaints will reach the required person in charge.
              Appropriate actions will be taken as soon as possible. The is no
              limit to your complaints. We are here to hear you.
            </span>
            <Link to="/complaints">
              <button className="button button-md button-outline">
                Complaint Here
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="gotoAnalytics">
        <Link to="/analytics">
          <button class="button">
            Go to Analytics
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </Link>

        <div class="button-layer1"></div>
        <div class="button-layer2"></div>
      </div>

      <div
        className="stats"
        style={{ display: "flex", justifycontent: "center" }}
      >
        <section className="sectionstats">
          <div class="container">
            <ul class="card">
              <div className="before-card"></div>
              <div className="after-card">
                <li>
                  <p>
                    <h3>{analyticdata.uniqueUsers}</h3>
                    <i class="fa fa-arrow-up clr-up"></i>
                  </p>
                  <span>Number of Unique Users</span>
                </li>
                <li>
                  <p>
                    <h3>{analyticdata.complete}</h3>
                    <i class="fa fa-arrow-down clr-down"></i>
                  </p>
                  <span>Number of Addressed Issues</span>
                </li>
                <li>
                  <p>
                    <h3>{analyticdata.workers}</h3>
                    <i class="fa fa-arrow-top"></i>
                  </p>
                  <span>Number of registered workers</span>
                </li>
                <li>
                  <p>
                    <h3>{analyticdata.complaints}</h3>
                    <i class="fa fa-arrow-top"></i>
                  </p>
                  <span>Number of Complaints</span>
                </li>
              </div>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
