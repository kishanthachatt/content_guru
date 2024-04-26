import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  type: "success",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      debugger;
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
