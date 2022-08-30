import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  getContacts(): Contact[] {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      return contacts;
    } else {
      return [];
    }
  }

  getContact(id: number): Contact | undefined {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const contact = contacts.find((contact: Contact) => contact.id === id)!;
      return contact;
    }
    return;
  }

  addContact(model: Contact) {
    model.name = model.name.trim();
    model.num = model.num.trim();
    model.email = model.email.trim();
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const id = Date.now();
    model.id = id;
    contacts.push(model);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  deleteContact(id: number) {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.filter(
        (contact: Contact) => contact.id !== id
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    }
  }

  searchContacts(term: string, path: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    const storedContacts = localStorage.getItem(path);
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.filter((contact: Contact) =>
        contact.name.toUpperCase().includes(term.toUpperCase())
      );
      return of(updatedContacts);
    } else {
      return of([]);
    }
  }

  multipleDelete(contacts: Contact[]) {
    const deletedContacts = contacts
      .filter((contact) => contact.isChecked === true)
      .map((contact) => contact.id);
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.filter(
        (contact: Contact) => !deletedContacts.includes(contact.id)
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    }
  }
}
