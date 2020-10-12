import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { clone } from '_/utils/clone.util';
import { Contact } from '_/types/contact.type';
import { isSavingSelector } from '../slice/contacts.selectors';
import { saveContactAction } from '../slice/procs/save-contact.proc';
import { editContactAction } from '../slice/procs/edit-contact.proc';

type Props = {
  editContact: Contact;
};

export function ContactForm(props: Props) {
  const { editContact } = props;

  const dispatch = useDispatch();
  const isSaving = useSelector(isSavingSelector);

  const [contact, setContact] = useState({
    birthDate: '',
    firstName: '',
    id: 0,
    lastName: '',
  });

  useEffect(() => {
    setContact(clone(editContact));
  }, [editContact]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const canSave =
    contact.firstName.trim() !== '' &&
    contact.lastName.trim() !== '' &&
    contact.birthDate.length === 10;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(saveContactAction(contact));
      }}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="First Name"
        name="firstName"
        onChange={onChange}
        value={contact.firstName}
      />
      <br />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="Last Name"
        name="lastName"
        onChange={onChange}
        value={contact.lastName}
      />
      <br />

      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="Birthday"
        name="birthDate"
        onChange={onChange}
        type="date"
        value={contact.birthDate}
      />
      <br />
      <br />

      <div>
        <Button
          disabled={isSaving}
          onClick={() => dispatch(editContactAction())}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          disabled={isSaving || !canSave}
          type="submit"
          variant="contained"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
