import { VisibilityFilterState, visibilityFilterSlice } from './filter.slice';

const sliceSelector = (state: any) =>
  state[visibilityFilterSlice.name] as VisibilityFilterState;

export const visibilityFilterSelector = sliceSelector;
