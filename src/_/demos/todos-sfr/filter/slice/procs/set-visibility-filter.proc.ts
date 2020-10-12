import { PayloadAction } from '@reduxjs/toolkit';

import {
  visibilityFilterSlice,
  VisibilityFilter,
  VisibilityFilterState,
} from '../filter.slice';

const actions = visibilityFilterSlice.addCaseReducers({
  setVisibilityFilter: (
    state: VisibilityFilterState,
    action: PayloadAction<VisibilityFilter>
  ) => {
    return action.payload;
  },
});

export const { setVisibilityFilter } = actions;
