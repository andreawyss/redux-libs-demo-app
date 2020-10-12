import { createStore } from 'redux';
import { rootSliceGroup } from '@vmw/slices-for-redux';
import mockContacts from '_/apis/contacts/contacts.mock-data.json';

import { toggleContactAction } from './toggle-contact.proc';
import { contactsSlice } from '../contacts.slice';

const initialState = {
  app: {
    $contacts: {
      checkedContactIds: [],
      contacts: mockContacts,
      filter: '',
      isLoading: false,
      orderBy: 'firstName',
      orderDir: 'asc',
    },
  },
};

const store: any = createStore(rootSliceGroup.reducer, initialState);

describe('toggle-contact.proc', () => {
  it('toggleContactAction updates state correctly', () => {
    const prevState = contactsSlice.selector(store.getState());
    const { contacts } = prevState;
    expect(contacts).not.toHaveLength(0);
    if (!contacts) {
      return;
    }
    expect(prevState.checkedContactIds).toEqual([]);

    const contact1 = contacts[1];
    store.dispatch(toggleContactAction(contact1));
    let state = contactsSlice.selector(store.getState());
    expect(state.checkedContactIds).toEqual([contact1.id]);

    const contact2 = contacts[2];
    store.dispatch(toggleContactAction(contact2));
    state = contactsSlice.selector(store.getState());
    expect(state.checkedContactIds).toEqual([contact1.id, contact2.id]);

    store.dispatch(toggleContactAction(contact1));
    state = contactsSlice.selector(store.getState());
    expect(state.checkedContactIds).toEqual([contact2.id]);
  });
});
