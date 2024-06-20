import React, { useEffect, useState } from "react";
import "./Complaints.css"; // Import CSS file
import Button from "@mui/material/Button";
import FormLocation from "./components/FormLocation";
import FormImageInput from "./components/FormImageInput";
import options from "./components/options.json";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

const Complaints = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    imageURL: "",
    location: { latitude: 0, longitude: 0, accuracy: 0 },
    severity: "",
    majorComponent: [],
    percentRecycled: "",
    sinceWhen: "",
    category: "",
    isdustbin: "",
    isdustbinOverflowing: "",
  });
  const navigate = useNavigate();

  console.log({ formData });
  console.log({ currentQuestion });

  const questions = [
    "Click the Picture for complaint & give Access of the Location",
    "How severe is the garbage site?",
    "Select the major component of garbage (Select atleast 1 option)",
    "How much percent of garbage can be recycled?",
    "Since when are you seeing this site overflowing with waste?",
    "Into which category does this site fit in?",
    "Is there any dustbin?",
    "Do you see PMC collecting garbage in this site?",
  ];

  const handleHover = () => {
    setHovered(true);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleNext = () => {
    if (currentQuestion === 0 && formData.imageURL === "") {
      alert("Please upload an image or wait for image to upload successfully");
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    // Disable submit button after clicking
    setSubmitDisabled(true);

    // Show the alert
    setShowAlert(true);

    // Logic to handle form submission
    console.log("Form submitted!");
    const reqBody = {};
    reqBody.longitude = formData.location.longitude;
    reqBody.latitude = formData.location.latitude;
    reqBody.imageURL = formData.imageURL;
    reqBody.severity = formData.severity;
    reqBody.wasteType = formData.majorComponent;

    if (formData.percentRecycled !== "") {
      reqBody.wasteRecyclable = formData.percentRecycled;
    }
    if (formData.sinceWhen !== "") {
      reqBody.siteUncleanDuration = formData.sinceWhen;
    }
    if (formData.category !== "") {
      reqBody.siteType = formData.category;
    }
    if (formData.isdustbin !== "") {
      reqBody.dustbinNearby = formData.isdustbin;
    }
    if (formData.isdustbinOverflowing !== "") {
      reqBody.dusbinOverflow = formData.isdustbinOverflowing;
    }
    if (formData.isPMCcollecting !== "") {
      reqBody.pmcCleanSite = formData.isPMCcollecting;
    }

    console.log({ reqBody });

    axios
      .post("/java/api/userspace/complain", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("submitted");
        alert("Complaint submitted successfully");
        navigate("/profile/complaints");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
    // You can reset the form state or redirect to another page after submission
  };

  useEffect(() => {
    if (
      formData.location.latitude !== 0 &&
      formData.location.longitude !== 0 &&
      formData.imageURL !== "" &&
      formData.severity !== "" &&
      formData.majorComponent.length !== 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    formData.location,
    formData.imageURL,
    formData.severity,
    formData.majorComponent,
  ]);

  const handleImageChange = (url) => {
    setFormData({ ...formData, imageURL: url });
  };

  const handleLocationChange = (location) => {
    setFormData({ ...formData, location: location });
  };

  return (
    <div>
      <div className="complaints-container">
        <div className="background-image"></div>
        <div className="content-container">
          {!clicked && ( // Render only if not clicked
            <div
              style={{
                height: "70vh",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1
                className="complaints-heading"
                style={{
                  color: hovered ? "red" : "inherit",
                  cursor: "pointer",
                }}
                onMouseEnter={handleHover}
                onMouseLeave={() => setHovered(false)}
                onClick={handleClick}
              >
                Click to Complaint
              </h1>
            </div>
          )}
          {clicked && (
            <div className="form-container-parent">
              <IconButton
                aria-label="previous question"
                disabled={currentQuestion <= 0}
                onClick={handlePrevious}
                style={{ height: "fit-content" }}
              >
                <ArrowBackIosIcon
                  sx={{ color: currentQuestion <= 0 ? "grey" : "white" }}
                />
              </IconButton>
              <div className="form-container">
                <h2>
                  {questions[currentQuestion]}
                  {currentQuestion <= 2 && (
                    <span className="required-star" style={{ color: "red" }}>
                      *
                    </span>
                  )}
                </h2>
                {/* Render input fields based on current question */}
                {currentQuestion === 0 && (
                  <>
                    <div id="recaptcha-container"></div>
                    <div
                      className="loc"
                      style={{ backgroundColor: "aliceblue", padding: "10px" }}
                    >
                      <FormLocation
                        loc={formData.location}
                        handleLocationChange={handleLocationChange}
                      />
                    </div>

                    <div
                      className="field"
                      style={{
                        backgroundColor: "aliceblue",
                        marginTop: "10px",
                        padding: "10px",
                      }}
                    >
                      <FormImageInput
                        userImage={formData.imageURL}
                        handleImageChange={handleImageChange}
                      />
                    </div>
                  </>
                )}
                {currentQuestion === 1 && (
                  <div className="optionscom">
                    <ul>
                      {options.severity.map((option) => (
                        <li key={option.value}>
                          <input
                            type="radio"
                            name="option"
                            checked={formData.severity === option.value}
                            value={option.value}
                            id={option.value}
                            className="ansList"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                severity: e.target.id,
                              })
                            }
                            // value={formData.severity}
                          />
                          <label htmlFor={option.value} className="ansa">
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentQuestion === 2 && (
                  <div className="optionscom">
                    <ul>
                      {options.wasteType.map((option) => (
                        <li key={option.value}>
                          <input
                            type="checkbox"
                            name="option"
                            id={option.value}
                            className="ansList"
                            onChange={(e) => {
                              setFormData((prev) => {
                                let newwasteType = prev.majorComponent.slice(); // Create a copy of the current array
                                const index = newwasteType.indexOf(e.target.id);
                                if (index === -1) {
                                  newwasteType.push(e.target.id);
                                } else {
                                  newwasteType.splice(index, 1); // Remove the element at index
                                }
                                return {
                                  ...prev,
                                  majorComponent: newwasteType, // Set the new array with checked items
                                };
                              });
                            }}
                          />
                          <label htmlFor={option.value} className="ansa">
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentQuestion === 3 && (
                  <div className="optionscom">
                    <ul>
                      {options.percentRecycle.map((option) => (
                        <li key={option.value}>
                          <input
                            type="radio"
                            name="option"
                            id={option.value}
                            className="ansList"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                percentRecycled: e.target.id,
                              })
                            }
                          />
                          <label htmlFor={option.value} className="ansa">
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentQuestion === 4 && (
                  <div className="optionscom">
                    <ul>
                      {options.siteClean.map((option) => (
                        <li key={option.value}>
                          <input
                            type="radio"
                            name="option"
                            id={option.value}
                            className="ansList"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sinceWhen: e.target.id,
                              })
                            }
                          />
                          <label htmlFor={option.value} className="ansa">
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentQuestion === 5 && (
                  <div className="optionscom">
                    <ul>
                      {options.siteCategory.map((option) => (
                        <li key={option.value}>
                          <input
                            type="radio"
                            name="option"
                            id={option.value}
                            className="ansList"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.id,
                              })
                            }
                          />
                          <label htmlFor={option.value} className="ansa">
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentQuestion === 6 && (
                  <>
                    <div className="optionscom">
                      <ul>
                        <li>
                          <input
                            type="radio"
                            name="isdustbin"
                            id="dustbin-yes"
                            className="ansList"
                            onChange={(e) =>
                              setFormData({ ...formData, isdustbin: true })
                            }
                          />
                          <label htmlFor="dustbin-yes" className="ansa">
                            Yes
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="isdustbin"
                            id="dustbin-no"
                            className="ansList"
                            onChange={(e) =>
                              setFormData({ ...formData, isdustbin: false })
                            }
                          />
                          <label htmlFor="dustbin-no" className="ansb">
                            No
                          </label>
                        </li>
                      </ul>
                    </div>

                    <>
                      <h2>Is the Dustbin Overflowing?</h2>
                      <div className="optionscom">
                        <ul>
                          <li>
                            <input
                              type="radio"
                              name="isdustbinOverflowing"
                              id="overflow-yes"
                              className="ansList"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  isdustbinOverflowing: true,
                                })
                              }
                            />
                            <label htmlFor="overflow-yes" className="ansa">
                              Yes
                            </label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              name="isdustbinOverflowing"
                              id="overflow-no"
                              className="ansList"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  isdustbinOverflowing: false,
                                })
                              }
                            />
                            <label htmlFor="overflow-no" className="ansb">
                              No
                            </label>
                          </li>
                        </ul>
                      </div>
                    </>
                  </>
                )}

                {currentQuestion === 7 && (
                  <div className="optionscom">
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="option"
                          id="a"
                          className="ansList"
                          onChange={(e) => {
                            setFormData({ ...formData, isPMCcollecting: true });
                          }}
                        />
                        <label htmlFor="a" className="ansa">
                          Yes
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="option"
                          id="b"
                          className="ansList"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              isPMCcollecting: false,
                            });
                          }}
                        />
                        <label htmlFor="b" className="ansb">
                          No
                        </label>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="prev-next-buttons">
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ width: "30%" }}
                    disabled={submitDisabled}
                  >
                    Submit
                  </Button>
                  {showAlert && (
                    <Alert
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "40%",
                        paddingTop: "5px",
                      }}
                      severity="success"
                    >
                      Success
                    </Alert>
                  )}
                </div>
              </div>
              <IconButton
                aria-label="next question"
                disabled={currentQuestion > 6}
                onClick={handleNext}
                style={{ height: "fit-content" }}
              >
                <ArrowForwardIosIcon
                  sx={{ color: currentQuestion > 6 ? "grey" : "white" }}
                />
              </IconButton>
            </div>
          )}
          <div
            className="paraComplaint"
            style={{ display: "flex", width: "100%", margin:"20px" }}
          >
            <p style={{margin:"20px"}}>Let us go green to get our planet clean</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
