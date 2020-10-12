import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createSagaTester } from '_/test-utils/createSagaTester';
import { apiBaseUrl } from '_/utils/env.utils';

import { contactsSlice } from '../contacts.slice';
import { loadContactsAction, LOAD_CONTACTS_ERROR } from './load-contacts.proc';

describe('load-contacts.proc', () => {
  const server = setupServer(
    rest.get(`/${apiBaseUrl}/contacts`, (req, res, ctx) => {
      // return res(ctx.delay(1), ctx.status(400, 'TEST ERROR'), ctx.json([]));
      return res(ctx.status(400, 'TEST ERROR'));
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

  const sagaTester = createSagaTester();

  function getSliceState() {
    return contactsSlice.selector(sagaTester.getState());
  }

  it('loadContactsAction handles error correctly', async () => {
    let state = getSliceState();
    expect(state.isLoading).toEqual(false);
    expect(state.lastError).toBeUndefined();

    sagaTester.dispatch(loadContactsAction());
    state = getSliceState();
    expect(state.isLoading).toEqual(true);

    await sagaTester.waitFor(LOAD_CONTACTS_ERROR);
    state = getSliceState();
    expect(state.isLoading).toEqual(false);
    expect(state.lastError).toBeDefined();
  });
});
