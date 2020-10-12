import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '_/demos/home/view/HomePage';
import { TodosRtkPage } from '_/demos/todos-rtk/TodosRtkPage';

export const pages = [
  { name: 'Home', route: '/' },
  { name: 'Todos RTK', route: '/todos-rtk' },
  { name: 'Todos SFR', route: '/todos-sfr' },
  { name: 'Contacts QRS', route: '/contacts-qrs' },
];

export function getPageName(pathname: string) {
  const page = pages.find((p) => p.route === pathname);
  if (page) {
    return page.name;
  }
  return 'Page Not Found';
}

export function AppPages() {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={TodosRtkPage} exact path="/todos-rtk" />
        <Route component={TodosSfrPage} exact path="/todos-sfr" />
        <Route component={ContactsQrsPage} exact path="/contacts-qrs" />
        <Route path="">
          <div>
            <h1>Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </Suspense>
  );
}

const TodosSfrPage = lazy(
  () =>
    import(
      /* webpackChunkName: "TodosSfr" */
      '_/demos/todos-sfr/TodosSfrPage'
    )
);

const ContactsQrsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "ContactsQrs" */
      '_/demos/contacts-qrs/ContactsQrsPage'
    )
);
