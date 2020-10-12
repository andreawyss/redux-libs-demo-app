import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SagaTester from 'redux-saga-tester';
import { apiBaseUrl } from '_/utils/env.utils';
import { createSagaTester } from '_/test-utils/createSagaTester';

import { contactsSlice, ContactsState } from '../contacts.slice';
import {
  deleteContactAction,
  DELETE_CONTACT_ERROR,
} from './delete-contact.proc';

import { clone } from '_/utils/clone.util';
import contacts from '_/apis/contacts/contacts.mock-data.json';

const mockContacts = clone(contacts);

describe('delete-contact.proc', () => {
  const server = setupServer(
    rest.delete(`/${apiBaseUrl}/contacts/:contactId`, (req, res, ctx) => {
      // return res(ctx.delay(100), ctx.status(400, 'TEST ERROR'), ctx.json([]));
      return res(ctx.delay(100), ctx.status(400, 'TEST ERROR'));
    })
  );

  beforeAll(() => {
    // Enable the mocking before all tests
    server.listen();
  });

  afterAll(() => {
    // Clean up the mocking once done
    server.close();
  });

  function getSliceState(sagaTester: SagaTester<any>) {
    return contactsSlice.selector(sagaTester.getState());
  }

  it('deleteContactAction handles error correctly', async () => {
    const contact1 = mockContacts[1];

    const contactSlice: ContactsState = {
      checkedContactIds: [],
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
    expect(state.deletedContactIds).toHaveLength(0);

    sagaTester.dispatch(deleteContactAction(contact1));
    state = getSliceState(sagaTester);
    expect(state.contacts).toHaveLength(initialCount);
    expect(state.deletedContactIds).toHaveLength(1);

    await sagaTester.waitFor(DELETE_CONTACT_ERROR);
    state = getSliceState(sagaTester);
    expect(state.contacts).toHaveLength(initialCount);
    expect(state.deletedContactIds).toHaveLength(0);
  });
});
