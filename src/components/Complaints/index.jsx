import React, { useEffect, useState } from "react";
import "./Complaints.css"; // Import CSS file
import Button from "@mui/material/Button";
import FormLocation from "./components/FormLocation";
import FormImageInput from "./components/FormImageInput";
import options from "./components/options.json";

const Complaints = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
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

  console.log({ formData });

  const questions = [
    "Click the Picture for complaint & give Access of the Location",
    "How severe is the garbage site?",
    "Is there any dustbin?",
    "Select the major component of garbage (Select atleast 1 option)",
    "How much percent of garbage can be recycled?",
    "Since when are you seeing this site overflowing with waste?",
    "Into which category does this site fit in?",
    "Do you see PMC collecting garbage in this site?",
  ];

  const handleHover = () => {
    setHovered(true);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Form submitted!");
    const reqBody = {};
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
          )}
          <br />
          {clicked && (
            <div className="form-container">
              <h2>{questions[currentQuestion]}</h2>
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
                          id={option.value}
                          className="ansList"
                          onChange={(e) =>
                            setFormData({ ...formData, severity: e.target.id })
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
                              let newwasteType =
                                prev.majorComponent.slice(); // Create a copy of the current array
                              const index = newwasteType.indexOf(
                                e.target.id
                              );
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
                            setFormData({ ...formData, sinceWhen: e.target.id })
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
                            setFormData({ ...formData, category: e.target.id })
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
                          name="option"
                          id="a"
                          className="ansList"
                          onChange={(e) =>
                            setFormData({ ...formData, isdustbin: true })
                          }
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
                          onChange={(e) =>
                            setFormData({ ...formData, isdustbin: false })
                          }
                        />
                        <label htmlFor="b" className="ansb">
                          No
                        </label>
                      </li>
                    </ul>
                  </div>
                  <h2>Is the Dusbin Overflowing?</h2>
                  <div className="optionscom">
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="option"
                          id="a"
                          className="ansList"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isdustbinOverflowing: true,
                            })
                          }
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isdustbinOverflowing: false,
                            })
                          }
                        />
                        <label htmlFor="b" className="ansb">
                          No
                        </label>
                      </li>
                    </ul>
                  </div>
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
                          setFormData({ ...formData, isPMCcollecting: false });
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
                {currentQuestion < 6 ? (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    style={{ width: "20%" }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    style={{
                      width: "20%",
                      backgroundColor: "lightgray",
                      color: "gray",
                    }}
                  >
                    Next
                  </Button>
                )}
                {currentQuestion > 0 ? (
                  <Button
                    variant="outlined"
                    onClick={handlePrevious}
                    style={{ width: "20%" }}
                  >
                    Previous
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    style={{
                      width: "20%",
                      backgroundColor: "lightgray",
                      color: "gray",
                    }}
                  >
                    Previous
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  style={{ width: "30%" }}
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          <div
            className="paraComplaint"
            style={{ display: "flex", width: "100%", marginTop: "20px" }}
          >
            <p>Let us go green to get our planet clean</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
