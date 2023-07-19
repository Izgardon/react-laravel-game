import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/appReducer";

const store = configureStore({
  reducer: reducer,
});

export default store;
