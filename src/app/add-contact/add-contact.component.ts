import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contacts: Contact[] = [];
  model = { name: '', num: '', email: '', image: '', type: 'contact' };
  @Output() event = new EventEmitter();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSubmit(): void {
    this.contacts = this.contactService.addContact(this.model as Contact);
    document
      .getElementById('profileImage')
      ?.setAttribute('src', '../../assets/profile.png');
    this.model = { name: '', num: '', email: '', image: '', type: 'contact' };
    // alert('Contact added successfully!');
    this.event.emit();
  }

  previewImage(e: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.model.image = JSON.stringify(reader.result);
        document
          .getElementById('profileImage')
          ?.setAttribute('src', JSON.parse(this.model.image));
      },
      false
    );

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
