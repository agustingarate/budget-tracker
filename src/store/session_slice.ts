import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    token: null,
    uid: null,
  },
  reducers: {
    set: (_, action) => {
      return { ...action.payload };
    },

    clearSession: () => {
      return {
        token: null,
        uid: null,
      };
    },
  },
});

export const { set, clearSession } = sessionSlice.actions;
export const selectUser = (state: RootState) => state.session;

export const sessionReducer = sessionSlice.reducer;
