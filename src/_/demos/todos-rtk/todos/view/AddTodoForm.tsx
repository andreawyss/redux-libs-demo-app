import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slice/todos.slice';

export function AddTodoForm() {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTodo(todoText));
        setTodoText('');
      }}
    >
      <input onChange={onChange} value={todoText} />
      <button disabled={!todoText.trim()} type="submit">
        Add Todo
      </button>
    </form>
  );
}
