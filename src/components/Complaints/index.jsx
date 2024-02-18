import React, { useState } from "react";
import "./Complaints.css"; // Import CSS file
import Button from "@mui/material/Button";
import FormLocation from "./components/FormLocation";
import FormImageInput from "./components/FormImageInput";


const Complaints = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isdustbin,setisdustbin] = useState('');
  const [formData, setFormData] = useState({
    imageURL: "",
    location: { latitude: 0, longitude: 0, accuracy: 0 },
    majorComponent: "",
    percentRecycled: "",
    sinceWhen: "",
    category: "",
  });

  const questions = [
    "Click the Picture for complaint & give Access of the Location",
    "Select the major component of garbage (Select atleast 1 option)",
    "How much percent of garbage can be recycled?",
    "Since when are you seeing this site overflowing with waste?",
    "Into which category does this site fit in?",
    "Is there any dustbin?",
    "Do you see PMC collecting garbage in this site?",
  ];

  const handledbYes = () => {
    setisdustbin(true);
  };
  const handledbNo = () => {
    setisdustbin(false);
  };
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
    // You can reset the form state or redirect to another page after submission
  };

  const [loc, setloc] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    country: "",
    state: "",
    city: "",
    postalcode: "",
  });
  const [userImage, setUserImage] = useState("");

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
                <div id="recaptcha-container"  ></div>
                <div className="loc"style={{backgroundColor:'aliceblue',padding:'50px'}}>
                <FormLocation loc={loc} setloc={setloc} />
                </div>
                
                <div className="field" style={{backgroundColor:'aliceblue',marginTop:'50px',padding:'50px'}}>
                  <FormImageInput userImage={userImage} setUserImage={setUserImage} />
                </div></>
              )}
              {currentQuestion === 1 && (
                <div className="optionscom">
                  <ul>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="a"
                        className="ansList"
                      />
                      <label htmlFor="a" className="ansa">
                        Dry Waste
                      </label>
                    </li>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="b"
                        className="ansList"
                      />
                      <label htmlFor="b" className="ansb">
                        Plant Waste
                      </label>
                    </li>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="c"
                        className="ansList"
                      />
                      <label htmlFor="c" className="ansc">
                        Construction Waste
                      </label>
                    </li>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="d"
                        className="ansList"
                      />
                      <label htmlFor="d" className="ansd">
                        Wet Waste
                      </label>
                    </li>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="e"
                        className="ansList"
                      />
                      <label htmlFor="e" className="anse">
                        Clothes
                      </label>
                    </li>
                    <li>
                      <input
                        type="Checkbox"
                        name="option"
                        id="e"
                        className="ansList"
                      />
                      <label htmlFor="e" className="anse">
                        Medical Waste
                      </label>
                    </li>
                  </ul>
                </div>
              )}

              {currentQuestion === 2 && (
                <div className="optionscom">
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="a"
                        className="ansList"
                      />
                      <label htmlFor="a" className="ansa">
                        10%-20%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="b"
                        className="ansList"
                      />
                      <label htmlFor="b" className="ansb">
                        20%-40%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="c"
                        className="ansList"
                      />
                      <label htmlFor="c" className="ansc">
                        40%-60%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="d"
                        className="ansList"
                      />
                      <label htmlFor="d" className="ansd">
                        60%-80%
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="e"
                        className="ansList"
                      />
                      <label htmlFor="e" className="anse">
                        80%-100%
                      </label>
                    </li>
                  </ul>
                </div>
              )}

              {currentQuestion === 3 && (
                <div className="optionscom">
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="a"
                        className="ansList"
                      />
                      <label htmlFor="a" className="ansa">
                        Never
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="b"
                        className="ansList"
                      />
                      <label htmlFor="b" className="ansb">
                        Rarely
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="c"
                        className="ansList"
                      />
                      <label htmlFor="c" className="ansc">
                        Some time
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="d"
                        className="ansList"
                      />
                      <label htmlFor="d" className="ansd">
                        Many times
                      </label>
                    </li>
                  </ul>
                </div>
              )}

              {currentQuestion === 4 && (
                <div className="optionscom">
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="a"
                        className="ansList"
                      />
                      <label htmlFor="a" className="ansa">
                        Roadside
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="b"
                        className="ansList"
                      />
                      <label htmlFor="b" className="ansb">
                        Highway side
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="c"
                        className="ansList"
                      />
                      <label htmlFor="c" className="ansc">
                        Market Area
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="d"
                        className="ansList"
                      />
                      <label htmlFor="d" className="ansd">
                        Contruction area
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="e"
                        className="ansList"
                      />
                      <label htmlFor="e" className="anse">
                        Residential area
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="e"
                        className="ansList"
                      />
                      <label htmlFor="e" className="anse">
                        Park & Playground
                      </label>
                    </li>
                  </ul>
                </div>
              )}

{currentQuestion === 5 && (
                <>
                <div className="optionscom">
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="a"
                        className="ansList"
                      />
                      <label htmlFor="a" className="ansa" onClick={handledbYes}>
                        Yes
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="option"
                        id="b"
                        className="ansList"
                      />
                      <label htmlFor="b" className="ansb" onClick={handledbNo}>
                        No
                      </label>
                    </li>
                    
                  </ul>
                </div>
                
                <div className="optionscom">
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="option"
                      id="a"
                      className="ansList"
                    />
                    <label htmlFor="a" className="ansa" onClick={handledbYes}>
                      Yes
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="option"
                      id="b"
                      className="ansList"
                    />
                    <label htmlFor="b" className="ansb" onClick={handledbNo}>
                      No
                    </label>
                  </li>
                  
                </ul>
              </div>
              </>
                


                // {isdustbin===true &&(
                  
                  
                // )}

                
              )}

{currentQuestion === 6 && (
  <div className="optionscom">
  <ul>
    <li>
      <input
        type="radio"
        name="option"
        id="a"
        className="ansList"
      />
      <label htmlFor="a" className="ansa" onClick={handledbYes}>
        Yes
      </label>
    </li>
    <li>
      <input
        type="radio"
        name="option"
        id="b"
        className="ansList"
      />
      <label htmlFor="b" className="ansb" onClick={handledbNo}>
        No
      </label>
    </li>
    
  </ul>
</div>
)}

              <div className="prev-next-buttons">
                {currentQuestion < 6? (
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
                >
                  Submit
                </Button>
              </div>

              
            </div>
          )}
          <div className="paraComplaint" style={{display:"flex",width:'100%',marginTop:'20px'}}><p>Let us go green to get our planet clean</p></div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
