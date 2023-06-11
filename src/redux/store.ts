import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./slice/toDoSlice";

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
