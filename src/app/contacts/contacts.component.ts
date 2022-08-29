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

  onSubmit() {
    // localStorage.setItem('groupName', this.groupName);
    // this.contactService.addGroup(this.contacts);
    // this.showTextbox = false;
  }

  getContactsBySearch(event: any) {
    console.log(event.contacts.length);
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
