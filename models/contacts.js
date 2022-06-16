const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const filePath = path.join(__dirname, "./contacts.json");

const updateData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const contacts = await fs.readFile(filePath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idDeleted = contacts.findIndex(item => item.id === contactId);
  if (idDeleted === -1) {
    return null;
  }
  const [result] = contacts.splice(idDeleted, 1);
  await updateData(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id: nanoid()
  }
  contacts.push(newContact);
  await updateData(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idex = contacts.findIndex(item => item.id === contactId);
  if (idex === -1) {
    return null;
  }
  contacts[idex] = {...contacts[idex], ...body };
  await updateData(contacts);
  return contacts[idex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
