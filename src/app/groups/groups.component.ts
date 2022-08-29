import { Component, OnInit } from '@angular/core';
import { Contact, Group } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groups = this.contactService.getGroups();
  }

  deleteGroup(id: number) {
    this.groups = this.contactService.deleteGroup(id);
  }

  getGroupsBySearch(event: any) {
    console.log(event.contacts.length);
    if (event.term.length !== 0) {
      this.groups = event.contacts;
    } else {
      this.getGroups();
    }
  }
}
