import { PayloadAction } from '@reduxjs/toolkit';

import { todosSlice, TodosState } from '../todos.slice';

let nextTodoId = 0;

const actions = todosSlice.addCaseReducers({
  addTodo: {
    prepare(text: string) {
      return { payload: { id: nextTodoId++, text } };
    },
    reducer(
      state: TodosState,
      action: PayloadAction<{ id: number; text: string }>
    ) {
      const { id, text } = action.payload;
      state.push({ completed: false, id, text });
    },
  },
});

export const { addTodo } = actions;
