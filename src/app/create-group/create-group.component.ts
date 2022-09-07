import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';

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
  @Input() model: any;
  @Output() event = new EventEmitter();

  constructor(private contactService: ContactService) {}

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
    this.contactService.addContact(this.model as Contact);
    document
      .getElementById('groupIcon')
      ?.setAttribute('src', '../../assets/profile.png');
    this.contacts.map((contact) => (contact.isChecked = false));
    this.model = {
      name: '',
      members: [{}],
      image: '',
      type: 'group',
    };
    this.event.emit();
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
}
