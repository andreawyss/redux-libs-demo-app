import React from 'react';
import { render as reactDomRender } from 'react-dom';

import { AppProviders } from '_/app/AppProviders';
import { AppLayout } from '_/app/AppLayout';

import './index.css';

const mountElement = document.getElementById('root');

export function mountApp() {
  reactDomRender(
    <AppProviders>
      <AppLayout />
    </AppProviders>,
    mountElement
  );
}

// export function main() {
//   render();
// }
