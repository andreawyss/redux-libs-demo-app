import { mountApp } from './mount-app';
import { isMock } from '_/utils/is-mock.util';

async function init() {
  // Uncomment condition to exclude mock from the production build
  // if (process.env.NODE_ENV === 'development') {
  /* istanbul ignore next */
  if (isMock) {
    // Use mock data
    const { worker } = require('./_/apis/mocks');
    await worker.start();
  }
  mountApp();
}

init();
