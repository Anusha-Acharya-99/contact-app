import { Component, OnInit } from '@angular/core';
import { Contact, Group } from '../contact';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getGroup();
    this.getContacts();
  }

  group: Group | undefined;

  getContacts() {
    this.contacts = this.contactService.getContacts();
  }

  getGroup(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.group = this.contactService.getGroup(id);
    if (this.group) {
      const ids = this.group.members?.map((member) => member.id);
      this.group.members = this.contactService
        .getContacts()
        .filter((contact) => ids?.includes(contact.id));
    }
  }
}
