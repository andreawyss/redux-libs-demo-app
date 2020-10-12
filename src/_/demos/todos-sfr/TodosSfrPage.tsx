import React from 'react';
import { AddTodoForm } from './todos/view/AddTodoForm';
import { VisibleTodoList } from './todos/view/VisibleTodoList';
import { Footer } from './filter/view/Footer';

const TodosSfrPage = () => (
  <div>
    <AddTodoForm />
    <VisibleTodoList />
    <Footer />
  </div>
);

// eslint-disable-next-line import/no-default-export
export default TodosSfrPage;
