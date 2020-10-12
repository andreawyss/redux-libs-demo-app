import { createSlice } from '@vmw/slices-for-redux';
import { Todo } from '_/types/todo.type';

export type TodosState = Todo[];

export const todosSlice = createSlice<TodosState>({
  initialState: [],
  name: '$todos',
});
