import { createSlice } from '@vmw/slices-for-redux';

export type VisibilityFilter = 'SHOW_ACTIVE' | 'SHOW_ALL' | 'SHOW_COMPLETED';

export const VisibilityFilters: { [k: string]: VisibilityFilter } = {
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
};

export type VisibilityFilterState = VisibilityFilter;

const initialState: VisibilityFilterState = VisibilityFilters.SHOW_ALL;

export const visibilityFilterSlice = createSlice<VisibilityFilterState>({
  initialState,
  name: '$visibilityFilter',
});
