"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "@/store";
import { hideSnackbar } from "@/store/snackbar/snackbarSlice";

const CustomSnackbar = () => {
  const { open, message, type } = useSelector(
    (state: RootState) => state.snackbar
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={Slide}
      style={{ top: "80px" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      key={"top" + "right"}
      message="testinh"
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={type}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
