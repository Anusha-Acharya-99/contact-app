import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
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
}
