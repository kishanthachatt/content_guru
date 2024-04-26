import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";

export interface ContentState {
  isContentLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: any | null;
  data: { contents: Array<any> };
}

const initialState: ContentState = {
  isContentLoading: false,
  isError: false,
  isSuccess: false,
  error: {},
  data: {
    contents: [],
  },
};

export const fetchContents = createAsyncThunk(
  "content/fetchContents",
  async (_, thunkAPI) => {
    try {
      const session = await getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      const accessToken = session.user.accessToken;

      const response = await axios.get("/api/content", {
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
      });

      return response.data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isContentLoading = true;
        state.isError = false;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isContentLoading = false;
        state.isSuccess = true;
        state.data.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action: PayloadAction<any>) => {
        state.isContentLoading = false;
        state.isError = true;
        state.error =
          action.payload?.response?.data?.message ||
          action.payload?.message ||
          null;
      });
  },
});

export const { clearState } = workspaceSlice.actions;

export default workspaceSlice.reducer;
