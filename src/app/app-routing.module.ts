import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AddContactComponent } from './add-contact/add-contact.component';

const routes: Routes = [
  {path:"", redirectTo:"/contacts", pathMatch:"full"},
  {path:"contacts",component:ContactsComponent},
  {path:"detail/:id", component:ContactDetailComponent},
  {path:"add",component: AddContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
