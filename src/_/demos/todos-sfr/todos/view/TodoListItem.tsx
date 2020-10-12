/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

type Props = {
  completed: boolean;
  onClick: () => void;
  text: string;
};

export function TodoListItem({ completed, onClick, text }: Props) {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
}
