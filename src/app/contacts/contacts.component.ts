import { Component, DoCheck, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, DoCheck {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngDoCheck(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  getSearchContact(contacts: Contact[]): void {
    console.log(contacts);
  }

  delete(id: number): void {
    this.contactService
      .deleteContact(id)
      .subscribe((contacts: Contact[]) => (this.contacts = contacts));
  }
}
