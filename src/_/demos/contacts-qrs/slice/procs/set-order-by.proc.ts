import { PayloadAction } from '@reduxjs/toolkit';

import { contactsSlice, ContactsState } from '../contacts.slice';

const actions = contactsSlice.addCaseReducers({
  setOrderBy: (slice: ContactsState, action: PayloadAction<string>) => {
    const orderBy = action.payload;
    let orderDir: 'asc' | 'desc' = 'asc';
    if (orderBy === slice.orderBy) {
      orderDir = slice.orderDir === 'asc' ? 'desc' : 'asc';
    }
    slice.orderBy = orderBy;
    slice.orderDir = orderDir;
  },
});

export const setOrderByAction = actions.setOrderBy;
export const SET_ORDER_BY = setOrderByAction.type;
