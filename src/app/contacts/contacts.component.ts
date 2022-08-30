import { Component, DoCheck, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, DoCheck {
  contacts: Contact[] = [];
  groupName: string = '';
  enableDelete = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngDoCheck() {
    this.findSelect();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  delete(id: number): void {
    this.contacts = this.contactService.deleteContact(id);
  }

  multipleDelete() {
    this.contacts = this.contactService.multipleDelete(this.contacts);
  }

  getContactsBySearch(event: any) {
    if (event.term.length !== 0) {
      this.contacts = event.contacts;
    } else {
      this.getContacts();
    }
  }

  findSelect() {
    this.enableDelete =
      this.contacts.some((contact) => contact.isChecked) === true;
  }
}
