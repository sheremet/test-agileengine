import {Routes, RouterModule} from '@angular/router';
import {UsersDetailsComponent} from './users-details/users-details.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersComponent} from './users/users.component';
import {UserDetailsEditComponent} from './users-details/user-details-edit/user-details-edit.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: UsersListComponent},
    {path: 'details/:id', component: UsersDetailsComponent},
    {path: 'details/:id/edit', component: UserDetailsEditComponent}
  ]
}
];

export const UserRoutes = RouterModule.forChild(routes);
