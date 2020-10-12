import { PayloadAction } from '@reduxjs/toolkit';

import { todosSlice, TodosState } from '../todos.slice';

const actions = todosSlice.addCaseReducers({
  toggleTodo: (state: TodosState, action: PayloadAction<number>) => {
    const todo = state.find((todo) => todo.id === action.payload);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
});

export const { toggleTodo } = actions;
