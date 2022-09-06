import { Component, DoCheck, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GroupService } from '../services/group.service';

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
  addParticipants = false;
  selected = false;
  newGroup = false;
  selectedContacts: Contact[] = [];
  groupIcon = '';

  constructor(
    private contactService: ContactService,
    private groupService: GroupService,
    private router: Router,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngDoCheck() {
    // this.getContacts();
    this.findSelect();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  delete(id: number): void {
    this.contacts = this.contactService.deleteContact(id);
    console.log(this.contacts);
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

  navigate(id: number) {
    this.router.navigate([`detail/${id}`]);
  }

  selectContact(contact: Contact) {
    contact.isChecked = !contact.isChecked;
    this.selectedContacts = this.contacts.filter(
      (contact) => contact.isChecked === true
    );
    console.log(this.selectedContacts);
  }

  previewImage(e: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.groupIcon = JSON.stringify(reader.result);
        document
          .getElementById('previewIcon')
          ?.setAttribute('src', JSON.parse(this.groupIcon));
      },
      false
    );

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  onSubmit() {
    this.groupService.addGroup(
      this.groupName,
      this.selectedContacts,
      this.groupIcon
    );
    alert('Group created successfully!');
    document
      .getElementById('groupIcon')
      ?.setAttribute('src', '../../assets/profile.png');
    this.contacts.map((contact) => (contact.isChecked = false));
  }

  clearSelected() {
    this.addParticipants = false;
    this.selectedContacts = this.contacts.map((contact) => {
      return {
        ...contact,
        isChecked: false,
      };
    });
    this.contacts = this.selectedContacts;
  }
}
