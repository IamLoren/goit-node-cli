import { program } from "commander";
import { listContacts, getContactById, addContact, removeContact } from './contacts.js';

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log('Усі контакти:', allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log('Контакт за id:', contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log('Доданий контакт:', newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log('Видалений контакт:', removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
