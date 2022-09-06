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
  profileImage = '';

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
    this.groupService.addGroup(
      this.groupName,
      this.contacts,
      this.profileImage
    );
    alert('Group created successfully!');
    document
      .getElementById('profileImage')
      ?.setAttribute('src', '../../assets/profile.png');
    this.contacts.map((contact) => (contact.isChecked = false));
  }

  findSelect() {
    this.enableDelete =
      this.contacts.some((contact) => contact.isChecked) === true;
  }

  previewImage(e: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.profileImage = JSON.stringify(reader.result);
        document
          .getElementById('profileImage')
          ?.setAttribute('src', JSON.parse(this.profileImage));
      },
      false
    );

    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
