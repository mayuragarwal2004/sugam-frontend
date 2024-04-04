import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import NotValidForm from "./NotValidForm";
import ResolvedForm from "./ResolvedForm";

const AnalyticsConfirmation = (props) => {
  const { open, onYes, handleResolveFormClose, setOpen, data, activeMarker } =
    props;
  function handleClose() {
    setOpen((prev) => ({ ...prev, state: true, lastClicked: "Not Valid" }));
  }
  return (
    <Backdrop
      sx={{
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "rgba(0, 0, 0)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open.state}
    >
      <div className="analytics-form-overlay">
        <CloseIcon
          onClick={handleResolveFormClose}
          className="overlay-confirmation-close"
        />
        {!open.confirm && (
          <>
            <div>Are you sure?</div>
            <div className="analytics-form-overlay-confirmation">
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={handleResolveFormClose}
              >
                No
              </Button>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={onYes}
              >
                Yes
              </Button>
            </div>
          </>
        )}
        {open.confirm && open.lastClicked === "Not Valid" && (
          <NotValidForm
            data={data}
            handleResolveFormClose={handleResolveFormClose}
            activeMarker={activeMarker}
          />
        )}
        {open.confirm && open.lastClicked === "Resolved" && (
          <ResolvedForm
            data={data}
            handleResolveFormClose={handleResolveFormClose}
            activeMarker={activeMarker}
          />
        )}
      </div>
    </Backdrop>
  );
};

export default AnalyticsConfirmation;
