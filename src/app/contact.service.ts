import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { CONTACTS } from './mock-contacts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor() {}

  // fetchContacts():Observable<Contact[]>{
  //   const storedContacts = localStorage.getItem("contacts");
  //   if(!storedContacts){
  //     localStorage.setItem('contacts',JSON.stringify(CONTACTS))
  //   }
  //   const contacts = storedContacts ? JSON.parse(storedContacts): CONTACTS;
  //   return contacts
  // }

  getContacts(): Observable<Contact[]> {
    const storedContacts = localStorage.getItem('contacts');
    if (!storedContacts) {
      localStorage.setItem('contacts', JSON.stringify(CONTACTS));
    }
    const contacts = storedContacts ? JSON.parse(storedContacts) : CONTACTS;
    return of(contacts);
  }

  getContact(id: number): Observable<Contact> {
    const storedContacts = localStorage.getItem('contacts');
    if (!storedContacts) {
      localStorage.setItem('contacts', JSON.stringify(CONTACTS));
    }
    const contacts = storedContacts ? JSON.parse(storedContacts) : CONTACTS;
    const contact = contacts.find((contact: Contact) => contact.id === id)!;
    return of(contact);
  }

  addContact(model: Contact) {
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : CONTACTS;
    const id = Math.max(...contacts.map((contact: Contact) => contact.id)) + 1;
    model.id = id;
    if (storedContacts) {
      const updatedContacts = JSON.parse(storedContacts);
      updatedContacts.push(model);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
  }

  deleteContact(id: number) {
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : CONTACTS;
    const updatedContacts = contacts.filter(
      (contact: Contact) => contact.id !== id
    );
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    return updatedContacts;
  }

  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    const storedContacts = localStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : CONTACTS;
    const updatedContacts = contacts.filter((contact: Contact) =>
      contact.name.toUpperCase().includes(term.toUpperCase())
    );
    return of(updatedContacts);
  }
}
