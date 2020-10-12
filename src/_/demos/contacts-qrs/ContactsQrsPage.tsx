/* eslint-disable import/max-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { editContactSelector } from './slice/contacts.selectors';

import { ContactForm } from './view/ContactForm';
import { ContactsView } from './view/ContactsView';

function ContactsPage() {
  const editContact = useSelector(editContactSelector);
  return (
    <div>
      {editContact ? (
        <ContactForm editContact={editContact} />
      ) : (
        <ContactsView />
      )}
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default ContactsPage;
