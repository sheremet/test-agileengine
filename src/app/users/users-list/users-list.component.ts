import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {User} from '../user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users: User[];

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.userService.getUsers().subscribe(users => {
        this.users = users;
      }
    );
  }

}
