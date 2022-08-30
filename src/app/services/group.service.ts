import { Injectable } from '@angular/core';
import { Contact, Group } from '../contact';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private contactService: ContactService) {}

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
      const groups = JSON.parse(storedGroups);
      return groups;
    } else {
      return [];
    }
  }

  getGroup(id: number): Group | undefined {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      const groups = JSON.parse(storedGroups);
      const group = groups.find((group: Group) => group.id === id);
      const ids = group.members?.map((member: Contact) => member.id);
      group.members = this.contactService
        .getContacts()
        .filter((contact) => ids?.includes(contact.id));
      return group;
    }
    return;
  }

  deleteGroup(id: number) {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      const groups = JSON.parse(storedGroups);
      const updatedGroups = groups.filter((group: Group) => group.id !== id);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      return updatedGroups;
    }
  }
}
