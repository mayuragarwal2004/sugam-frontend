import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ComplainDetailOverlay from "./ComplainDetailOverlay";

const ComplainCards = ({ data }) => {
  const [currentDoc, setcurrentDoc] = useState();
  function overlayClose() {
    setcurrentDoc(null);
  }
  console.log(Boolean(currentDoc));
  // debugger
  return (
    <>
      {currentDoc && (
        <ComplainDetailOverlay doc={currentDoc} handleClose={overlayClose} />
      )}
      <div className="complaincard-main">
        <div className="complaincard-header">header</div>
        <div className="complaincard-body">
          {data &&
            data.map((doc) => {
              return (
                <div className="complaincard-card">
                <OpenInFullIcon onClick={()=>setcurrentDoc(doc)} className="complaincard-openinfull" />
                  <div className="complaincard-card-image">
                    <img
                      src={doc.userImage}
                      loading="lazy"
                      alt="not found"
                      className="complaincard-card-image-main"
                    />
                  </div>
                  <div className="complaincard-card-text">
                    <p>
                      {doc.notValid && (
                        <p>Not Valid Reported: {doc.notValid.length}</p>
                      )}
                      
                      <b>Components Of Garbage: </b>{" "}
                      {doc.majorComponents.map((x, i) =>
                        doc.majorComponentsNumber - 1 === i ? x : x + ", "
                      )}
                      <br />
                      <b>Chronic Site: </b>
                      {parseInt(doc.majorComponentsNumber) > 3 ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ComplainCards;
