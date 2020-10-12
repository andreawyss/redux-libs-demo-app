import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityFilterSelector } from '../slice/filter.selectors';
import { setVisibilityFilter } from '../slice/filter.slice';

type Props = {
  children: ReactNode;
  filter: string;
};

export function FilterButton(props: Props) {
  const { children, filter } = props;

  const dispatch = useDispatch();
  const activeFilter = useSelector(visibilityFilterSelector);

  return (
    <button
      disabled={activeFilter === filter}
      onClick={() => dispatch(setVisibilityFilter(filter))}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
}
