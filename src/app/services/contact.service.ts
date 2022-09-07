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
    // const storedGroups = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts).map((contact: Contact) => {
        if (contact.image) {
          return {
            ...contact,
            image: JSON.parse(contact.image),
          };
        } else {
          return {
            ...contact,
            image: null,
          };
        }
      });
      // if (storedGroups) {
      //   const contactsGroups = contacts.concat(
      //     JSON.parse(storedGroups).map((contact: Contact) => {
      //       if (contact.image) {
      //         return {
      //           ...contact,
      //           image: JSON.parse(contact.image),
      //         };
      //       } else {
      //         return {
      //           ...contact,
      //           image: null,
      //         };
      //       }
      //     })
      //   );
      //   return contactsGroups;
      // }
      return contacts;
    } else {
      return [];
    }
  }

  getContact(id: number): Contact | undefined {
    const storedContacts = localStorage.getItem('contacts');
    // const storedGroups = localStorage.getItem('groups');

    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      const contact = contacts?.find((contact: Contact) => contact.id === id)!;
      if (contact && contact.image) {
        contact.image = JSON.parse(contact.image);
      }
      if (contact && contact.members) {
        const ids = contact.members?.map((member: Contact) => member.id);
        contact.members = contacts
          .filter(
            (contact: Contact) =>
              contact.type === 'contact' && ids?.includes(contact.id)
          )
          .map((contact: Contact) => {
            if (contact.image) {
              return {
                ...contact,
                image: JSON.parse(contact.image),
              };
            } else {
              return { ...contact, image: null };
            }
          });
        // .map((contact: Contact) => {
        //   return {
        //     ...contact,
        //     image: JSON.parse(contact.image),
        //   };
        // });
      }
      // if (!contact && storedGroups) {
      //   const groups = JSON.parse(storedGroups);
      //   // if (contacts.length === 0 && groups.length === 0) {
      //   //   console.log('empty');
      //   //   this.router.navigate(['/']);
      //   // }
      //   const group = groups?.find((group: Group) => group.id === id);
      //   if (group && group.image) {
      //     group.image = JSON.parse(group.image);
      //   }
      //   if (group && group.members) {
      //     const ids = group.members?.map((member: Contact) => member.id);
      //     group.members = this.getContacts().filter((contact) =>
      //       ids?.includes(contact.id)
      //     );
      //   }
      //   return group;
      // }
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
    return contacts;
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
      // if (storedGroups) {
      //   const updatedGroups = JSON.parse(storedGroups).filter(
      //     (contact: Contact) => contact.id !== id
      //   );
      //   localStorage.setItem('groups', JSON.stringify(updatedGroups));
      //   return updatedContacts.concat(updatedGroups);
      // }
      return updatedContacts.map((contact: Contact) => {
        if (contact.image) {
          return {
            ...contact,
            image: JSON.parse(contact.image),
          };
        } else {
          return {
            ...contact,
            image: null,
          };
        }
      });
    }
  }

  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    const storedContacts = localStorage.getItem('contacts');
    // const storedGroups = localStorage.getItem('groups');
    if (storedContacts) {
      const contacts = JSON.parse(storedContacts);
      // const groups = JSON.parse(storedGroups);
      const searchResult = contacts
        .filter((contact: Contact) =>
          contact.name.toUpperCase().includes(term.toUpperCase())
        )
        .map((contact: Contact) => {
          return {
            ...contact,
            image: JSON.parse(contact.image),
          };
        });
      // const searchResult = searchContacts.concat(
      //   groups
      //     .filter((group: Contact) =>
      //       group.name.toUpperCase().includes(term.toUpperCase())
      //     )
      //     .map((contact: Contact) => {
      //       return {
      //         ...contact,
      //         image: JSON.parse(contact.image),
      //       };
      //     })
      // );
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
      return updatedContacts.map((contact: Contact) => {
        if (contact.image) {
          return {
            ...contact,
            image: JSON.parse(contact.image),
          };
        } else {
          return {
            ...contact,
            image: null,
          };
        }
      });
    }
  }
}
