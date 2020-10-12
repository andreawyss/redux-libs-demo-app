import wretch from 'wretch';
import { PayloadAction } from '@reduxjs/toolkit';
import { runSaga } from '@vmw/queue-for-redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { apiBaseUrl } from '_/utils/env.utils';
import { logError } from '_/utils/log-error.util';

import { contactsSlice, ContactsState } from '../contacts.slice';
import { Contact } from '_/types/contact.type';

const actions = contactsSlice.addCaseReducers({
  deleteContact: (slice: ContactsState, action: PayloadAction<Contact>) => {
    const { id } = action.payload;
    if (!slice.deletedContactIds.includes(id)) {
      slice.deletedContactIds.push(id);
    }
  },

  deleteContactDone: (slice: ContactsState, action: PayloadAction<Contact>) => {
    const { id } = action.payload;

    const { checkedContactIds, contacts, deletedContactIds } = slice;
    let index = deletedContactIds.findIndex((item) => item === id);
    if (index !== -1) {
      deletedContactIds.splice(index, 1);
    }
    index = checkedContactIds.findIndex((item) => item === id);
    if (index !== -1) {
      checkedContactIds.splice(index, 1);
    }
    if (contacts) {
      index = contacts.findIndex((s) => s.id === id);
      contacts.splice(index, 1);
    }
    if (slice.selectedContactId === id) {
      slice.selectedContactId = 0;
    }
  },

  deleteContactError(
    slice: ContactsState,
    action: PayloadAction<{ contact: Contact; errorMsg: string }>
  ) {
    const { contact, errorMsg } = action.payload;
    const { id } = contact;
    slice.lastError = errorMsg;

    const { deletedContactIds } = slice;
    const index = deletedContactIds.findIndex((item) => item === id);
    if (index !== -1) {
      deletedContactIds.splice(index, 1);
    }
  },
});

export const deleteContactAction = actions.deleteContact;
export const DELETE_CONTACT_ERROR = actions.deleteContactError.type;

const deleteContactDoneAction = actions.deleteContactDone;
export const DELETE_CONTACT_DONE = deleteContactDoneAction.type;

runSaga(function* deleteContactWatch(): any {
  yield takeEvery(actions.deleteContact.type, deleteContactWorker);
});

function* deleteContactWorker(action: PayloadAction<Contact>): any {
  const contact = action.payload;
  try {
    yield call(deleteContactDelegate, contact.id);
    yield put(deleteContactDoneAction(contact));
  } catch (err) {
    const errorMsg = yield call(logError, err);
    yield put(actions.deleteContactError({ contact, errorMsg }));
  }
}

function deleteContactDelegate(id: number) {
  return wretch(`${apiBaseUrl}/contacts/${id}`).delete().res();
}
