import { Injectable } from '@angular/core';
import { Contact, Group } from '../contact';
import { Observable, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  getContacts(): Contact[] {
    const storedContacts = localStorage.getItem('contacts');
    const storedGroups = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts).map((contact: Contact) => {
        return {
          ...contact,
          image: JSON.parse(contact.image),
        };
      });
      if (storedGroups) {
        const contactsGroups = contacts.concat(
          JSON.parse(storedGroups).map((contact: Contact) => {
            return {
              ...contact,
              image: JSON.parse(contact.image),
            };
          })
        );
        return contactsGroups;
      }
      return contacts;
    } else {
      return [];
    }
  }

  getContact(id: number): Contact | undefined {
    const storedContacts = localStorage.getItem('contacts');
    const storedGroups = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const contact = contacts.find((contact: Contact) => contact.id === id)!;
      if (contact) {
        contact.image = JSON.parse(contact.image);
      }
      if (!contact && storedGroups) {
        const groups = JSON.parse(storedGroups);
        const group = groups.find((group: Group) => group.id === id);
        group.image = JSON.parse(group.image);
        return group;
      }
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
    // const storedGroups = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const updatedContacts = contacts.filter(
        (contact: Contact) => contact.id !== id
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    }
  }

  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    const storedContacts = localStorage.getItem('contacts');
    const storedGroups = localStorage.getItem('groups');
    if (storedContacts && storedGroups) {
      const contacts = JSON.parse(storedContacts);
      const groups = JSON.parse(storedGroups);
      const searchContacts = contacts
        .filter((contact: Contact) =>
          contact.name.toUpperCase().includes(term.toUpperCase())
        )
        .map((contact: Contact) => {
          return {
            ...contact,
            image: JSON.parse(contact.image),
          };
        });
      const searchResult = searchContacts.concat(
        groups
          .filter((group: Contact) =>
            group.name.toUpperCase().includes(term.toUpperCase())
          )
          .map((contact: Contact) => {
            return {
              ...contact,
              image: JSON.parse(contact.image),
            };
          })
      );
      return of(searchResult);
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
