import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users/users.component';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {UsersListComponent} from './users-list/users-list.component';
import {HttpClientModule} from '@angular/common/http';
import {UsersService} from './users.service';
import {UserRoutes} from './users-routes';
import {TwoColRowComponent} from '../components/two-col-row/two-col-row.component';
import {UserDetailsEditComponent} from './users-details/user-details-edit/user-details-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlFieldComponent} from '../components/form-control-field/form-control-field.component';
import { UserEditFormComponent } from './users-details/user-details-edit/user-edit-form/user-edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutes,
    HttpClientModule
  ],
  declarations: [
    TwoColRowComponent,
    FormControlFieldComponent,
    UsersComponent,
    UsersDetailsComponent,
    UsersListComponent,
    UserDetailsEditComponent,
    UserEditFormComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule {
}
