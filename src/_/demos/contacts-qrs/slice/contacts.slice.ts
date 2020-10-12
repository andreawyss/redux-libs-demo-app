import { createSlice } from '@vmw/slices-for-redux';
import { appSliceGroup } from '_/common/slices/app-slice-group';

import { Contact } from '_/types/contact.type';

export type ContactsState = {
  checkedContactIds: number[];
  contacts: null | Contact[];
  deletedContactIds: number[];
  editContact: undefined | Contact;
  filter: string;
  isLoading: boolean;
  isSaving: boolean;
  lastError: undefined | string;
  orderBy: string;
  orderDir: 'desc' | 'asc' | undefined;
  selectedContactId: number;
};

const initialState: ContactsState = {
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

export const contactsSlice = createSlice<ContactsState>({
  initialState,
  name: '$contacts',
  parent: appSliceGroup,
});
