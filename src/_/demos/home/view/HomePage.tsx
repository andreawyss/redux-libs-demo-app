import React from 'react';

function HomePage() {
  return (
    <div>
      <p>Demo app to showcase, compare and test some libraries for Redux.</p>

      <p>These include:</p>

      <ul>
        {libs.map((lib) => (
          <li key={lib.name}>
            <a href={lib.url} rel="noopener noreferrer" target="_blank">
              {lib.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default HomePage;

const libs = [
  { name: '@reduxjs/toolkit', url: 'https://redux-toolkit.js.org/' },
  {
    name: '@vmw/slices-for-redux',
    url: 'https://vmware.github.io/slices-for-redux/',
  },
  {
    name: '@vmw/queue-for-redux-saga',
    url: 'https://vmware.github.io/queue-for-redux-saga/',
  },
  { name: 'redux-saga', url: 'https://redux-saga.js.org/' },
];
