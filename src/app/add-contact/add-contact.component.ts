import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
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
  add(model: { name: string; num: string; email: string }) {
    model.name = model.name.trim();
    model.num = model.num.trim();
    model.email = model.email.trim();
    this.contactService.addContact(model as Contact);
  }

  onSubmit(): void {
    this.add(this.model);
    this.model = { name: '', num: '', email: '' };
    alert('Contact added successfully!');
  }
}
