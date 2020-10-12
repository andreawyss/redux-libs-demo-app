import { setupServer } from 'msw/node';
import SagaTester from 'redux-saga-tester';
import { createSagaTester } from '_/test-utils/createSagaTester';

import { contactsSlice, ContactsState } from '../contacts.slice';
import {
  deleteContactAction,
  DELETE_CONTACT_DONE,
} from './delete-contact.proc';
import { contactsMocks } from '_/apis/contacts/contacts.mocks';
import { clone } from '_/utils/clone.util';
import contacts from '_/apis/contacts/contacts.mock-data.json';

const mockContacts = clone(contacts);

describe('delete-contact.proc', () => {
  const server = setupServer(...contactsMocks);

  // Enable the mocking before all tests
  beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  // Clean up the mocking once done
  afterAll(() => server.close());

  function getSliceState(sagaTester: SagaTester<any>) {
    return contactsSlice.selector(sagaTester.getState());
  }

  it('deletes selected Contact', async () => {
    const contact1 = mockContacts[0];

    const contactSlice: ContactsState = {
      checkedContactIds: [contact1.id],
      contacts: mockContacts,
      deletedContactIds: [],
      editContact: undefined,
      filter: '',
      isLoading: false,
      isSaving: false,
      lastError: undefined,
      orderBy: 'firstName',
      orderDir: 'asc',
      selectedContactId: 0,
    };

    const initialState = {
      app: {
        $contacts: contactSlice,
      },
    };
    const sagaTester = createSagaTester(initialState);

    let state = getSliceState(sagaTester);
    const initialCount = state.contacts ? state.contacts.length : 0;
    expect(state.checkedContactIds).toHaveLength(1);
    expect(state.deletedContactIds).toHaveLength(0);

    sagaTester.dispatch(deleteContactAction(contact1));
    state = getSliceState(sagaTester);
    expect(state.contacts).toHaveLength(initialCount);
    expect(state.checkedContactIds).toHaveLength(1);
    expect(state.deletedContactIds).toHaveLength(1);

    await sagaTester.waitFor(DELETE_CONTACT_DONE);
    state = getSliceState(sagaTester);
    expect(state.contacts).toHaveLength(initialCount - 1);
    expect(state.deletedContactIds).toHaveLength(0);
    expect(state.checkedContactIds).toHaveLength(0);
  });

  it('succeeds when contacts is null', async () => {
    const contact1 = mockContacts[0];

    const contactSlice: ContactsState = {
      checkedContactIds: [],
      contacts: null,
      deletedContactIds: [],
      editContact: undefined,
      filter: '',
      isLoading: false,
      isSaving: false,
      lastError: undefined,
      orderBy: 'firstName',
      orderDir: 'asc',
      selectedContactId: 0,
    };

    const initialState = {
      app: {
        $contacts: contactSlice,
      },
    };
    const sagaTester = createSagaTester(initialState);

    let state = getSliceState(sagaTester);
    expect(state.contacts).toBeNull();

    sagaTester.dispatch(deleteContactAction(contact1));
    state = getSliceState(sagaTester);
    expect(state.contacts).toBeNull();

    await sagaTester.waitFor(DELETE_CONTACT_DONE);
  });
});
