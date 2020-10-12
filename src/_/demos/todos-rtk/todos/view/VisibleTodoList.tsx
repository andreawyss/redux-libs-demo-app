import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visibleTodosSelector } from '../slice/todos.selectors';
import { toggleTodo } from '../slice/todos.slice';
import { TodoListItem } from './TodoListItem';

export function VisibleTodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(visibleTodosSelector);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          {...todo}
          onClick={() => dispatch(toggleTodo(todo.id))}
        />
      ))}
    </ul>
  );
}
