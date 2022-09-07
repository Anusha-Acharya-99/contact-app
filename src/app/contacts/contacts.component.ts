import { Component, DoCheck, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, DoCheck {
  contacts: Contact[] = [];
  enableDelete = false;
  menuOpen = false;
  imageUrl = '../../assets/profile.png';
  addParticipants = false;
  selected = false;
  newGroup = false;
  newContact = false;
  deleteMultiple = false;
  model: { name: string; members: Contact[]; image: string; type: string } = {
    name: '',
    members: [],
    image: '',
    type: 'group',
  };

  constructor(private contactService: ContactService, private router: Router) {}

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
    if (this.deleteMultiple) {
      this.enableDelete =
        this.contacts.some((contact) => contact.isChecked) === true;
    }
  }

  navigate(id: number) {
    this.router.navigate([`detail/${id}`]);
  }

  selectContact(contact: Contact) {
    contact.isChecked = !contact.isChecked;
    if (this.addParticipants) {
      this.model.members = this.contacts.filter(
        (contact) => contact.isChecked === true
      );
    }
  }

  previewImage(e: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.model.image = JSON.stringify(reader.result);
        document
          .getElementById('previewIcon')
          ?.setAttribute('src', JSON.parse(this.model.image));
      },
      false
    );

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  onSubmit() {
    this.contactService.addContact(this.model as Contact);
    document
      .getElementById('groupIcon')
      ?.setAttribute('src', '../../assets/profile.png');
    this.contacts = this.contacts.map((contact) => ({
      ...contact,
      isChecked: false,
    }));
    this.addParticipants = false;
    this.newGroup = false;
  }

  clearSelected() {
    this.addParticipants = false;
    this.contacts = this.contactService.getContacts();
    this.model.members = [];
  }

  createGroup() {
    this.menuOpen = false;
    this.addParticipants = true;
    this.newContact = false;
    this.contacts = this.contactService
      .getContacts()
      .filter((contact: Contact) => contact.type === 'contact');
  }
}
