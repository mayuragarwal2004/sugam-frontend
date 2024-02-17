import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

const ComplainDetailOverlay = (props) => {
  const { doc, handleClose } = props;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={handleClose}
      >
        <div className="complaindetailoverlay-main">
          <img
            src={doc.userImage}
            alt="img"
            loading="lazy"
            style={{ maxHeight: "80%", maxWidth: "95%" }}
          />
          <div className="complaindetailoverlay-body">
            <div className="complaincard-card-text">
              <p>
                {doc.notValid && (
                  <p>Not Valid Reported: {doc.notValid.length}</p>
                )}
                <b>Name: </b> {doc.fullname}
                <br />
                <b>Components Of Garbage: </b>{" "}
                {doc.majorComponents.map((x, i) =>
                  doc.majorComponentsNumber - 1 === i ? x : x + ", "
                )}
                <br />
                <b>Chronic Site: </b>
                {parseInt(doc.majorComponentsNumber) > 3 ? "Yes" : "No"}
                <br />
                <b>How often the site is cleaned: </b> {doc.siteClean}
                <br />
                <b>Recycle% : </b> {doc.percentRecycle}
                <br />
                <b>Since when is garbage overflowing?: </b>
                {doc.overflowingWaste}
                <br />
                There is{" "}
                {doc.dustbin === "Yes" ? (
                  <>
                    <b>a dustbin nearby, which is </b>
                    {doc.dustbinFilled === "Yes" ? (
                      <b>filled up</b>
                    ) : (
                      <b>not filled up.</b>
                    )}
                  </>
                ) : (
                  <b>not a dustbin nearby.</b>
                )}
                <br />
                PMC is{" "}
                {doc.PMCCollecting === "Yes" ? (
                  <>
                    <b>seen cleaning</b> in this area. {doc.garbageCollected}
                  </>
                ) : (
                  <>
                    <b>not seen cleaning</b> in this area.
                  </>
                )}
                <br />
                <b>Site Category: </b>{" "}
                {doc.siteCategory.map((x, i) =>
                  doc.siteCategory.length - 1 === i ? x : x + ", "
                )}
              </p>
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
};

export default ComplainDetailOverlay;
