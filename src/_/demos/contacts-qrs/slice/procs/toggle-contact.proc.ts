import { PayloadAction } from '@reduxjs/toolkit';

import { contactsSlice, ContactsState } from '../contacts.slice';
import { Contact } from '_/types/contact.type';

const actions = contactsSlice.addCaseReducers({
  toggleContact: (slice: ContactsState, action: PayloadAction<Contact>) => {
    const { id } = action.payload;
    const { checkedContactIds } = slice;
    const index = checkedContactIds.indexOf(id);
    if (index === -1) {
      checkedContactIds.push(id);
    } else {
      checkedContactIds.splice(index, 1);
    }
  },
});

export const toggleContactAction = actions.toggleContact;
