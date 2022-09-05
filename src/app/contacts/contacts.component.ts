import { Component, DoCheck, OnInit, Renderer2 } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, DoCheck {
  contacts: Contact[] = [];
  groupName: string = '';
  enableDelete = false;
  menuOpen = false;
  imageUrl = '../../assets/profile.png';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngDoCheck() {
    this.getContacts();
    this.findSelect();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
    // this.contacts = this.contacts.map((contact) => {
    //   return { ...contact, image: JSON.parse(contact.image) };
    // });
    // console.log(this.contacts);
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
