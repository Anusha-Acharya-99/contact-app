import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contacts: Contact[] = [];
  model = { name: '', num: '', email: '' };

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSubmit(): void {
    this.contactService.addContact(this.model as Contact);
    this.model = { name: '', num: '', email: '' };
    alert('Contact added successfully!');
  }
}
