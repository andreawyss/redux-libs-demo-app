import { PayloadAction } from '@reduxjs/toolkit';

import { contactsSlice, ContactsState } from '../contacts.slice';
import { Contact } from '_/types/contact.type';

const actions = contactsSlice.addCaseReducers({
  selectContact: (slice: ContactsState, action: PayloadAction<Contact>) => {
    const contact = action.payload;
    if (slice.selectedContactId && slice.selectedContactId === contact.id) {
      slice.selectedContactId = 0;
    } else {
      slice.selectedContactId = contact.id;
    }
  },
});

export const selectContactAction = actions.selectContact;
