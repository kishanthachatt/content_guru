import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from "./snackbar/snackbarSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
