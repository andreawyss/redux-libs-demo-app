/* eslint-disable import/max-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Contact } from '_/types/contact.type';
import {
  checkedContactIdsSelector,
  selectedContactIdSelector,
} from '../slice/contacts.selectors';
import { deleteContactAction } from '../slice/procs/delete-contact.proc';
import { selectContactAction } from '../slice/procs/select-contact.proc';
import { toggleContactAction } from '../slice/procs/toggle-contact.proc';

import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { editContactAction } from '../slice/procs/edit-contact.proc';

type Props = {
  contact: Contact;
};

export function ContactRow(props: Props): React.ReactElement<any> {
  const { contact } = props;

  const dispatch = useDispatch();
  const selectedContactId = useSelector(selectedContactIdSelector);
  const isSelected = selectedContactId === contact.id;

  const checkedContactIds = useSelector(checkedContactIdsSelector);
  const isChecked = checkedContactIds.includes(contact.id);

  return (
    <TableRow
      hover
      key={contact.id}
      onClick={() => dispatch(selectContactAction(contact))}
      role="checkbox"
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isChecked}
          color="primary"
          onChange={() => {
            dispatch(toggleContactAction(contact));
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </TableCell>
      <TableCell>
        <Typography>{contact.firstName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{contact.lastName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatDate(contact.birthDate)}</Typography>
      </TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(editContactAction(contact));
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteContactAction(contact));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function formatDate(dateIso: string) {
  return format(parseISO(dateIso), 'MMM d, yyyy');
}
