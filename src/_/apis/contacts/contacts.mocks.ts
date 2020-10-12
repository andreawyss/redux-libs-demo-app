import { rest } from 'msw';
import { parseUrl } from 'query-string';
import { Contact } from '_/types/contact.type';
import { apiBaseUrl } from '_/utils/env.utils';
import { sort } from '_/utils/stable-sort.util';
import contacts from './contacts.mock-data.json';

const isTest = process.env.NODE_ENV === 'test';
const delay = isTest ? 0 : 700;

function getContacts(query: any): Contact[] {
  if (!query) {
    return contacts;
  }
  const { orderBy, orderDir } = query;
  return sort(contacts, orderBy, orderDir);
}

const getHandler = rest.get(`/${apiBaseUrl}/contacts`, (req, res, ctx) => {
  const { query } = parseUrl(req.url.href);
  const result = getContacts(query);
  return res(ctx.delay(delay), ctx.status(200), ctx.json(result));
});

const postHandler = rest.post(`/${apiBaseUrl}/contacts`, (req, res, ctx) => {
  const newContact = req.body as Contact;
  newContact.id = new Date().getTime();
  contacts.push(newContact);
  return res(ctx.delay(delay), ctx.status(200), ctx.json(newContact));
});

const putHandler = rest.put(
  `/${apiBaseUrl}/contacts/:contactId`,
  (req, res, ctx) => {
    const updatedContact = req.body as Contact;
    const index = contacts.findIndex(
      (s: Contact) => s.id === updatedContact.id
    );
    if (index !== -1) {
      contacts[index] = updatedContact;
    }
    return res(ctx.delay(delay), ctx.status(200), ctx.json(updatedContact));
  }
);

const deleteHandler = rest.delete(
  `/${apiBaseUrl}/contacts/:contactId`,
  (req, res, ctx) => {
    const { contactId } = req.params;
    const id = parseInt(contactId, 10);
    const index = contacts.findIndex((s: Contact) => s.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    return res(ctx.delay(delay), ctx.status(204, 'Deleted'));
  }
);

export const contactsMocks = [
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
];
