import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '_/types/contact.type';

import { contactsSlice, ContactsState } from '../contacts.slice';

const actions = contactsSlice.addCaseReducers({
  editContact: (
    slice: ContactsState,
    action: PayloadAction<Contact | undefined>
  ) => {
    slice.editContact = action.payload;
  },
});

export const { editContact: editContactAction } = actions;
