import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getContact();
  }
  contact: Contact | undefined;

  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService
      .getContact(id)
      .subscribe((contact: Contact) => (this.contact = contact));
  }
}
