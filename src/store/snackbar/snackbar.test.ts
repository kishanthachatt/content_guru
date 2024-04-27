import { showSnackbar, hideSnackbar } from "./snackbarSlice";
import snackbarReducer, { SnackbarState } from "./snackbarSlice";

describe("snackbar slice", () => {
  const initialState: SnackbarState = {
    open: false,
    message: "",
    type: "success",
  };

  it("should handle showSnackbar action", () => {
    const newState = snackbarReducer(
      initialState,
      showSnackbar({ message: "Test message", type: "error" })
    );
    expect(newState).toEqual({
      open: true,
      message: "Test message",
      type: "error",
    });
  });

  it("should handle hideSnackbar action", () => {
    const state: SnackbarState = {
      open: true,
      message: "Test message",
      type: "error",
    };
    const newState = snackbarReducer(state, hideSnackbar());
    expect(newState).toEqual({
      open: false,
      message: "",
      type: "error", // Ensure type is not modified
    });
  });
});
