import React from 'react';
import { AddTodoForm } from './todos/view/AddTodoForm';
import { VisibleTodoList } from './todos/view/VisibleTodoList';
import { Footer } from './filter/view/Footer';

export const TodosRtkPage = () => (
  <div>
    <AddTodoForm />
    <VisibleTodoList />
    <Footer />
  </div>
);
