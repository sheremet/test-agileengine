import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {UsersService} from '../users.service';
import {User} from '../user';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  @Input() user: User;
  loaded = false;

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private location: Location) {
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserDetails(id)
      .subscribe(user => {
        this.user = user;
        this.loaded = true;
      });
  }

  goBack(): void {
    this.location.back();
  }

}
