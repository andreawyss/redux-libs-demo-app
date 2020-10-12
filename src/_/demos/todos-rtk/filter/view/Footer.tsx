import React from 'react';
import { FilterButton } from './FilterButton';
import { VisibilityFilters } from '../slice/filter.slice';

export function Footer() {
  return (
    <div>
      <span>Show: </span>
      <FilterButton filter={VisibilityFilters.SHOW_ALL}>All</FilterButton>
      <FilterButton filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterButton>
      <FilterButton filter={VisibilityFilters.SHOW_COMPLETED}>
        Completed
      </FilterButton>
    </div>
  );
}
