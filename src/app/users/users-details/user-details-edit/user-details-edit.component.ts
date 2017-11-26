import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  currentUserId: number;

  constructor(private route: ActivatedRoute,
              private location: Location) {
    this.currentUserId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

  }

  goBack(): void {
    this.location.back();
  }

}
