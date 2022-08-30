import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  contacts: Contact[] = [];
  groupName: string = '';
  enableDelete = false;

  constructor(
    private contactService: ContactService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngDoCheck() {
    this.findSelect();
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSubmit() {
    this.groupService.addGroup(this.groupName, this.contacts);
    alert('Group created successfully!');
    this.contacts.map((contact) => (contact.isChecked = false));
  }

  findSelect() {
    this.enableDelete =
      this.contacts.some((contact) => contact.isChecked) === true;
  }
}
