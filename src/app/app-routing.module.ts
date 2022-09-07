import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  // { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  // { path: '', component: ContactsComponent, outlet: 'sidebar' },
  // { path: 'create-group', component: CreateGroupComponent, outlet: 'sidebar' },
  { path: 'detail/:id', component: ContactDetailComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group-detail/:id', component: GroupDetailComponent },
  // { path: 'create-group', component: CreateGroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
