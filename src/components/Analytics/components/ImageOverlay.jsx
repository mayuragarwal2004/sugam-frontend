import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";

const ImageOverlay = (props) => {
  const { src, handleClose } = props;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={handleClose}
      >
        <img
          src={src}
          alt="img"
          loading="lazy"
          style={{ maxHeight: "80%", maxWidth: "95%" }}
        />
      </Backdrop>
    </>
  );
};

export default ImageOverlay;
