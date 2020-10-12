import { setupWorker } from 'msw';

import { contactsMocks } from './contacts/contacts.mocks';

export const worker = setupWorker(...contactsMocks);
