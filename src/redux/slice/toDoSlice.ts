import { ToDoTask } from "./../../types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as ToDoTask[];

const toDoSlice = createSlice({
  name: "toDotasks",
  initialState,
  reducers: {
    addToDo: {
      reducer: (state, actions: PayloadAction<ToDoTask>) => {
        state.push(actions.payload);
      },
      prepare: (description: string, task: string) => ({
        payload: {
          id: uuidv4(),
          description,
          task,
          completed: false,
        } as ToDoTask,
      }),
    },
    removeToDo(state: any[], actions: PayloadAction<string>) {
      const index = state.findIndex(
        (toDo: { id: string }) => toDo.id === actions.payload
      );
      state.splice(index, 1);
    },
    setToDoStatus(
      state: any[],
      actions: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex(
        (toDo: { id: string }) => toDo.id === actions.payload.id
      );
      state[index].completed = actions.payload.completed;
    },
  },
});

export const actions = toDoSlice.actions;
const toDoReducer = toDoSlice.reducer;
export default toDoReducer;
