import { createSlice } from "@reduxjs/toolkit";

const appStoreSlice = createSlice({
  name: "appstore",
  initialState: { loading: false },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const {setLoading}= appStoreSlice.actions;
export default appStoreSlice.reducer;