import { Injectable } from '@angular/core';
import { Contact, Group } from './contact';
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

  addGroup(groupName: string, contacts: Contact[]) {
    const groupContacts = contacts.filter(
      (contact) => contact.isChecked === true
    );
    const storedGroups = localStorage.getItem('groups');
    const id = Date.now();
    if (groupContacts && groupName) {
      const newGroup = { name: groupName, id: id, members: groupContacts };
      if (storedGroups) {
        const groups = JSON.parse(storedGroups);
        groups.push(newGroup);
        localStorage.setItem('groups', JSON.stringify(groups));
      } else {
        localStorage.setItem('groups', JSON.stringify([newGroup]));
      }
    }
  }

  getGroups() {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      const contacts = JSON.parse(storedGroups);
      return contacts;
    } else {
      return [];
    }
  }

  getGroup(id: number): Group | undefined {
    const storedContacts = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const contact = contacts.find((contact: Contact) => contact.id === id)!;
      return contact;
    }
    return;
  }

  deleteGroup(id: number) {
    const storedContacts = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.filter(
        (contact: Contact) => contact.id !== id
      );
      localStorage.setItem('groups', JSON.stringify(updatedContacts));
      return updatedContacts;
    }
  }
}
