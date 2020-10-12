import { createSelector } from '@reduxjs/toolkit';
import { visibilityFilterSelector } from '../../filter/slice/filter.selectors';
import { VisibilityFilters } from '../../filter/slice/filter.slice';
import { todosSlice } from './todos.slice';

const sliceSelector = todosSlice.selector;

export const todosSelector = sliceSelector;

export const visibleTodosSelector = createSelector(
  [todosSelector, visibilityFilterSelector],
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((t) => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((t) => !t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  }
);
