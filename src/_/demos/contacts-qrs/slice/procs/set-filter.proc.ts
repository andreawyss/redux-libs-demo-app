import { PayloadAction } from '@reduxjs/toolkit';

import { contactsSlice, ContactsState } from '../contacts.slice';

const actions = contactsSlice.addCaseReducers({
  setFilter: (slice: ContactsState, action: PayloadAction<string>) => {
    const filter = action.payload;
    slice.filter = filter;
  },
});

export const setFilterAction = actions.setFilter;
