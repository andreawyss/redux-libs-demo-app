import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '_/types/todo.type';

export type TodosState = Todo[];

let nextTodoId = 0;

export const todosSlice = createSlice({
  initialState: [],
  name: 'todos',
  reducers: {
    addTodo: {
      // @ts-ignore
      prepare(text: string) {
        return { payload: { id: nextTodoId++, text } };
      },
      reducer(state: TodosState, action) {
        const { id, text } = action.payload;
        state.push({ completed: false, id, text });
      },
    },
    toggleTodo(state: TodosState, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;
