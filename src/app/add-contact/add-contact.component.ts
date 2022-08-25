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
  model = { name: '', num: '' };

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }
  add(model: { name: string; num: string }) {
    model.name = model.name.trim();
    model.num = model.num.trim();
    if (!model.name || !model.num) {
      return;
    }
    this.contactService.addContact(model as Contact);
  }

  onSubmit(): void {
    this.add(this.model);
    this.model = { name: '', num: '' };
    alert('Contact added successfully!');
  }
}
