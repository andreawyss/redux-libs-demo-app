/* eslint-disable import/max-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contact } from '_/types/contact.type';
import { orderBySelector, orderDirSelector } from '../slice/contacts.selectors';
import { setOrderByAction } from '../slice/procs/set-order-by.proc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { ContactRow } from './ContactRow';

const cols = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'birthDate', label: 'Born' },
];

type Props = {
  contacts: null | Contact[];
};

export function ContactsTable(props: Props) {
  const { contacts } = props;

  const dispatch = useDispatch();
  const orderBy = useSelector(orderBySelector);
  const orderDir = useSelector(orderDirSelector);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />

          {cols.map((col) => (
            <TableCell
              key={col.id}
              onClick={() => dispatch(setOrderByAction(col.id))}
            >
              <TableSortLabel active={orderBy === col.id} direction={orderDir}>
                {col.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {contacts &&
          contacts.map((contact: any) => (
            <ContactRow contact={contact} key={contact.id} />
          ))}
      </TableBody>
    </Table>
  );
}
