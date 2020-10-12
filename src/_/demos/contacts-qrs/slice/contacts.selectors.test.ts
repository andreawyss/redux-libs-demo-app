import { createStore } from 'redux';
import { rootSliceGroup } from '@vmw/slices-for-redux';
import contacts from '_/apis/contacts/contacts.mock-data.json';

import {
  isLoadingSelector,
  filteredContactsSelector,
  contactsSelector,
} from './contacts.selectors';
import { ContactsState } from './contacts.slice';

const expectedState: ContactsState = {
  checkedContactIds: [1, 3],
  contacts,
  deletedContactIds: [],
  editContact: undefined,
  filter: '2000',
  isLoading: true,
  isSaving: false,
  lastError: undefined,
  orderBy: 'firstName',
  orderDir: 'desc',
  selectedContactId: 0,
};

const store: any = createStore(rootSliceGroup.reducer, {
  app: {
    $contacts: expectedState,
  },
});

const state = store.getState();

describe('Contacts selectors', () => {
  it('should select isLoading', () => {
    expect(isLoadingSelector(state)).toBe(expectedState.isLoading);
  });

  it('should select contacts', () => {
    expect(contactsSelector(state)).toBe(expectedState.contacts);
  });

  it('should select filteredContacts', () => {
    expect(filteredContactsSelector(state)).toHaveLength(1);
  });
});
