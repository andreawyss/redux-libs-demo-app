/* eslint-disable import/max-dependencies */
import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  filteredContactsSelector,
  isLoadingSelector,
  filterSelector,
} from '../slice/contacts.selectors';
import { loadContactsAction } from '../slice/procs/load-contacts.proc';
import { setFilterAction } from '../slice/procs/set-filter.proc';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { ContactsTable } from './ContactsTable';
import { editNewContactAction } from '../slice/procs/edit-new-contact.proc';

export function ContactsView() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const isLoading = useSelector(isLoadingSelector);
  const contacts = useSelector(filteredContactsSelector);

  useEffect(() => {
    dispatch(loadContactsAction());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.content}>
        <div className={classes.filterBar}>
          <TextField
            label="Filter"
            onChange={(event: any) =>
              dispatch(setFilterAction(event.target.value))
            }
            value={filter}
          />
          <span className={classes.spacer} />
          <Button
            color="primary"
            onClick={() => dispatch(editNewContactAction())}
            variant="contained"
          >
            Add New
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => dispatch(loadContactsAction())}
            variant="outlined"
          >
            {isLoading ? 'Loading...' : 'Re-Load'}
          </Button>
        </div>
        <hr />
        <ContactsTable contacts={contacts} />
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    filterBar: {
      display: 'flex',
      flexDirection: 'row',
    },

    root: {
      display: 'flex',
    },
    spacer: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  })
);
