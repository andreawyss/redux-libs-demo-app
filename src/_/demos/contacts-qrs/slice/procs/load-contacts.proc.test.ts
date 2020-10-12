import { createSagaTester } from '_/test-utils/createSagaTester';
import mockContacts from '_/apis/contacts/contacts.mock-data.json';

import { contactsSlice } from '../contacts.slice';
import { loadContactsAction, CONTACTS_CHANGED } from './load-contacts.proc';

import { setupServer } from 'msw/node';
import { contactsMocks } from '_/apis/contacts/contacts.mocks';

describe('load-contacts.proc', () => {
  const server = setupServer(...contactsMocks);

  beforeAll(() => {
    // Enable the mocking before all tests
    server.listen();
  });

  afterAll(() => {
    // Clean up the mocking once done
    server.close();
  });

  const sagaTester = createSagaTester();

  function getSliceState() {
    return contactsSlice.selector(sagaTester.getState());
  }

  it('loadContactsAction updates state correctly', async () => {
    let state = getSliceState();
    expect(state.isLoading).toEqual(false);
    expect(state.contacts).toBeNull();

    sagaTester.dispatch(loadContactsAction());
    state = getSliceState();
    expect(state.isLoading).toEqual(true);

    await sagaTester.waitFor(CONTACTS_CHANGED);
    state = getSliceState();
    expect(state.isLoading).toEqual(false);
    expect(state.contacts).toEqual(mockContacts);
  });
});
