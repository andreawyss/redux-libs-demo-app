import wretch from 'wretch';
import { PayloadAction } from '@reduxjs/toolkit';
import { runSaga } from '@vmw/queue-for-redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { apiBaseUrl } from '_/utils/env.utils';
import { logError } from '_/utils/log-error.util';

import { contactsSlice, ContactsState } from '../contacts.slice';
import { Contact } from '_/types/contact.type';

const actions = contactsSlice.addCaseReducers({
  contactSaved(
    slice: ContactsState,
    action: PayloadAction<{ contact: Contact }>
  ) {
    const { contact } = action.payload;
    slice.isSaving = false;
  },

  saveContact(slice: ContactsState, action: PayloadAction<Contact>) {
    slice.isSaving = true;
    slice.lastError = undefined;
    slice.editContact = undefined;
  },

  saveContactError(slice: ContactsState, action: PayloadAction<string>) {
    slice.isSaving = false;
    slice.lastError = action.payload;
  },
});

export const saveContactAction = actions.saveContact;
export const SAVE_CONTACT_ERROR = actions.saveContactError.type;
export const CONTACT_SAVED = actions.contactSaved.type;

runSaga(function* saveContactWatch(): any {
  yield takeEvery([saveContactAction.type], saveContactWorker);
});

function* saveContactWorker(action: PayloadAction<Contact>): any {
  try {
    const contact = yield call(saveContactDelegate, action.payload);
    yield put(actions.contactSaved({ contact }));
  } catch (err) {
    const errorMsg = yield call(logError, err);
    yield put(actions.saveContactError(errorMsg));
  }
}

function saveContactDelegate(contact: Contact) {
  const { id } = contact;
  if (id) {
    return wretch(`${apiBaseUrl}/contacts/${id}`).put(contact).json();
  }
  return wretch(`${apiBaseUrl}/contacts`).post(contact).json();
}
