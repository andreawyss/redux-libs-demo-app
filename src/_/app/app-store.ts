import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureSagaStore } from '@vmw/queue-for-redux-saga';
import { rootSliceGroup } from '@vmw/slices-for-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { appHistory } from './app-history';
import { visibilityFilterSlice } from '_/demos/todos-rtk/filter/slice/filter.slice';
import { todosSlice } from '_/demos/todos-rtk/todos/slice/todos.slice';

// add slice reducers
rootSliceGroup.addReducers({
  // Add the ConnectedRouter's reducer to the rootReducer
  // @ts-ignore
  router: connectRouter(appHistory),
  // standard reducers are explicitly added here
  [visibilityFilterSlice.name]: visibilityFilterSlice.reducer,
  [todosSlice.name]: todosSlice.reducer,
});

// Note: middleware is an Array
const middleware = getDefaultMiddleware({
  //   immutableCheck: true, // default is true
  //   serializableCheck: true, // default is true
  thunk: true, // configureSagaStore default is false
}).concat([
  // routerMiddleware syncs the window location path into the store.
  routerMiddleware(appHistory),
]);

// Create the Redux store
export const appStore = configureSagaStore({
  middleware,
  reducer: rootSliceGroup.reducer,
});
