//store/naviSlice.ts

import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface NaviPath {
    naviPath: string;
}

const initialState: NaviPath = {
    naviPath: "/",
};

export const naviSlice = createSlice({
    name: "navi",
    initialState,
    reducers: {
        setNaviPath(state, action) {
            state.naviPath = action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.navi,
            };
        },
    },
});

export const { setNaviPath } = naviSlice.actions;

export const selectNaviPath = (state: AppState) => state.navi.naviPath;

export default naviSlice.reducer;


