import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appStore } from './app-store';
import { appHistory } from '_/app/app-history';

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#0000aa',
  //   },
  //   secondary: {
  //     main: '#00aa00',
  //   },
  // },
});

type Props = {
  children: ReactNode;
};

export function AppProviders(props: Props) {
  const { children } = props;
  return (
    <Provider store={appStore}>
      <ConnectedRouter history={appHistory}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}
