import { Component, OnInit } from '@angular/core';
import { Group } from '../contact';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groups = this.groupService.getGroups();
  }

  deleteGroup(id: number) {
    this.groups = this.groupService.deleteGroup(id);
  }

  getGroupsBySearch(event: any) {
    if (event.term.length !== 0) {
      this.groups = event.contacts;
    } else {
      this.getGroups();
    }
  }
}
