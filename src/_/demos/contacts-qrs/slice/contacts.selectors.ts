import { createSelector } from '@reduxjs/toolkit';

import { contactsSlice } from './contacts.slice';
import { Contact } from '_/types/contact.type';

export const {
  checkedContactIds: checkedContactIdsSelector,
  contacts: contactsSelector,
  deletedContactIds: deletedContactIdsSelector,
  editContact: editContactSelector,
  filter: filterSelector,
  isLoading: isLoadingSelector,
  isSaving: isSavingSelector,
  orderBy: orderBySelector,
  orderDir: orderDirSelector,
  selectedContactId: selectedContactIdSelector,
} = contactsSlice.selectors;

export const activeContactsSelector = createSelector(
  deletedContactIdsSelector,
  contactsSelector,
  (deletedContactIds, contacts) => {
    if (!contacts) {
      return contacts;
    }
    return contacts.filter(
      (contact: Contact) => !deletedContactIds.includes(contact.id)
    );
  }
);

export const filteredContactsSelector = createSelector(
  filterSelector,
  activeContactsSelector,
  (filter, contacts) => {
    if (!filter || !contacts) {
      return contacts;
    }
    return (
      contacts &&
      contacts.filter((contact: Contact) => isContactMatch(contact, filter))
    );
  }
);

function isContactMatch(contact: Contact, filter: string): boolean {
  return (
    filter.length > 0 &&
    (isNameMatch(contact, filter) || stringContains(contact.birthDate, filter))
  );
}

function isNameMatch(contact: Contact, filter: string): boolean {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  try {
    const re = new RegExp(filter, 'gi');
    return fullName.search(re) > -1;
  } catch {
    return false;
  }
}

function stringContains(value: string, filter: string): boolean {
  return Boolean(value && value.indexOf(filter.toLowerCase()) !== -1);
}
