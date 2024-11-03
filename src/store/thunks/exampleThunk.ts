// import { AnyAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import { ThunkAction } from "redux-thunk";
// import { setMode, toggleMode } from "../slices/themeSlice";

// ?? When calling these thunks in code, they need to be inside a React Component, and you have to use dispatch before so dispatch(exampleThunk())
// export function exampleThunk(): ThunkAction<void, RootState, unknown, AnyAction> {
//     return async (dispatch, getState) => {
//         // Grab whatever value you need from state
//         const modeFromState = getState().theme.mode;

//         // do whatever logic you need

//         // Call functions to update your state
//         dispatch(toggleMode());
//     }
// }
