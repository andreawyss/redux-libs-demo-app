import { contactsSlice, ContactsState } from '../contacts.slice';

const actions = contactsSlice.addCaseReducers({
  editNewContact: (slice: ContactsState) => {
    slice.editContact = {
      birthDate: '',
      firstName: '',
      id: 0,
      lastName: '',
    };
  },
});

export const { editNewContact: editNewContactAction } = actions;
