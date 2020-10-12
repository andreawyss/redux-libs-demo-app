import { createStore } from 'redux';
import { rootSliceGroup } from '@vmw/slices-for-redux';

import { setOrderByAction } from './set-order-by.proc';
import { contactsSlice } from '../contacts.slice';

const store: any = createStore(rootSliceGroup.reducer);

describe('set-order-by.proc', () => {
  it('setOrderByAction updates state correctly', () => {
    const orderBy = 'name';

    store.dispatch(setOrderByAction(orderBy));
    let state = contactsSlice.selector(store.getState());
    expect(state.orderBy).toBe(orderBy);
    expect(state.orderDir).toBe('asc');

    store.dispatch(setOrderByAction(orderBy));
    state = contactsSlice.selector(store.getState());
    expect(state.orderBy).toBe(orderBy);
    expect(state.orderDir).toBe('desc');

    store.dispatch(setOrderByAction(orderBy));
    state = contactsSlice.selector(store.getState());
    expect(state.orderBy).toBe(orderBy);
    expect(state.orderDir).toBe('asc');
  });
});
