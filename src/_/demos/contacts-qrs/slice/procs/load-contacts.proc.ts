/* eslint-disable import/max-dependencies */
import wretch from 'wretch';
import { PayloadAction } from '@reduxjs/toolkit';
import { runSaga } from '@vmw/queue-for-redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { apiBaseUrl } from '_/utils/env.utils';
import { logError } from '_/utils/log-error.util';

import { SET_ORDER_BY } from './set-order-by.proc';
import { contactsSlice, ContactsState } from '../contacts.slice';
import { orderBySelector, orderDirSelector } from '../contacts.selectors';
import { Contact } from '_/types/contact.type';
import { CONTACT_SAVED } from './save-contact.proc';

const actions = contactsSlice.addCaseReducers({
  contactsChanged(
    slice: ContactsState,
    action: PayloadAction<{ contacts: Contact[] }>
  ) {
    const { contacts } = action.payload;
    slice.isLoading = false;
    slice.contacts = contacts;
  },

  loadContacts(slice: ContactsState) {
    slice.isLoading = true;
    slice.contacts = null;
    slice.lastError = undefined;
  },

  loadContactsError(slice: ContactsState, action: PayloadAction<string>) {
    slice.isLoading = false;
    slice.lastError = action.payload;
  },
});

export const loadContactsAction = actions.loadContacts;
export const LOAD_CONTACTS_ERROR = actions.loadContactsError.type;
export const CONTACTS_CHANGED = actions.contactsChanged.type;

runSaga(function* loadContactsWatch(): any {
  yield takeEvery(
    [loadContactsAction.type, SET_ORDER_BY, CONTACT_SAVED],
    loadContactsWorker
  );
});

function* loadContactsWorker(): any {
  try {
    const orderBy = yield select(orderBySelector);
    const orderDir = yield select(orderDirSelector);
    const contacts = yield call(loadContactsDelegate, orderBy, orderDir);
    yield put(actions.contactsChanged({ contacts }));
  } catch (err) {
    const errorMsg = yield call(logError, err);
    yield put(actions.loadContactsError(errorMsg));
  }
}

function loadContactsDelegate(orderBy: string, orderDir: string) {
  return wretch(
    `${apiBaseUrl}/contacts?orderBy=${orderBy}&orderDir=${orderDir}`
  )
    .get()
    .json();
}
