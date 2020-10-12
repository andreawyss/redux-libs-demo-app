/* eslint-disable import/max-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppPages, pages, getPageName } from './AppPages';

function pathnameSelector(state: any) {
  return state.router.location.pathname;
}

export function AppLayout() {
  const dispatch = useDispatch();
  const pathname = useSelector(pathnameSelector);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography noWrap variant="h6">
            {getPageName(pathname)}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
      >
        <List disablePadding>
          <ListItem dense>
            <ListItemText
              primary={
                <Typography variant="subtitle1">Redux Libs Demos</Typography>
              }
              secondary="v0.1.0"
            />
          </ListItem>

          <Divider />
          {pages.map((page) => (
            <ListItem
              button
              key={page.route}
              onClick={() => dispatch(push(page.route))}
              selected={pathname === page.route}
            >
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AppPages />
      </main>
    </div>
  );
}

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      zIndex: theme.zIndex.drawer + 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
  })
);
