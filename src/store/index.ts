import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from "./snackbar/snackbarSlice";
import contentSlice from "./content/contentSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
    content: contentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
