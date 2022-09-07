import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  contact: Contact | undefined;
  showDetails = false;
  members = '';
  imageUrl = '../../assets/profile.png';

  ngOnInit(): void {}

  ngDoCheck() {
    this.getContact();
  }

  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactService.getContact(id);
    if (this.contact?.members) {
      this.members = this.contact.members
        .map((member) => {
          return member.name;
        })
        .join(', ');
    }
  }

  displayDetails() {
    this.showDetails = true;
  }
}
