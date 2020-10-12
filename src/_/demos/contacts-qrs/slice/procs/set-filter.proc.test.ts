import { createStore } from 'redux';
import { rootSliceGroup } from '@vmw/slices-for-redux';

import { setFilterAction } from './set-filter.proc';
import { contactsSlice } from '../contacts.slice';

const store: any = createStore(rootSliceGroup.reducer);

describe('set-filter.proc', () => {
  it('setFilterAction updates state correctly', () => {
    const prevState = contactsSlice.selector(store.getState());

    const newValue = 'aa';
    store.dispatch(setFilterAction(newValue));

    const state = contactsSlice.selector(store.getState());
    expect(state).not.toEqual(prevState);
    expect(state.filter).toEqual(newValue);
  });
});
