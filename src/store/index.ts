import { configureStore } from "@reduxjs/toolkit";
import appStoreReducer from "./appstore";

const reducer ={
    appStore: appStoreReducer
}

export const store=configureStore({
   reducer,
})

export type RootTypes = typeof reducer;