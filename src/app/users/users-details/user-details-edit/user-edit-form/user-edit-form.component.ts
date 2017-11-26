import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../user';
import {UsersService} from '../../../users.service';
import {CustomValidators} from '../../../../shared/custom-validators';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  @Input() currentUserId: number;

  loaded = false;
  loadingMessage: string;
  formSavedMessage: string;
  private formSubmitStatus: boolean;
  private user: User;
  private formSavedMessageTimeout: any = null;

  constructor(private fb: FormBuilder,
              private userService: UsersService) {
  }

  createForm() {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])]],
      username: [this.user.username, [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      email: [this.user.email, [Validators.required, Validators.pattern(CustomValidators.email())]],
      address: this.fb.group({
        street: [this.user.address.street, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        suite: [this.user.address.suite, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        city: [this.user.address.city, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        zipcode: [this.user.address.zipcode, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        geo: this.fb.group({
          lat: [this.user.address.geo.lat, [Validators.required, Validators.pattern(CustomValidators.coord())]],
          lng: [this.user.address.geo.lng, [Validators.required, Validators.pattern(CustomValidators.coord())]]
        })
      }),
      phone: [this.user.phone, [Validators.required, Validators.pattern(CustomValidators.phone())]],
      website: [this.user.website, [Validators.required, Validators.pattern(CustomValidators.url())]],
      company: this.fb.group({
        name: [this.user.company.name, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        catchPhrase: [this.user.company.catchPhrase, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
        bs: [this.user.company.bs, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]]
      })
    });
  }

  onSubmit(value): void {
    this.formSubmitStatus = true;
    if (this.userForm.valid) {
      value.id = this.currentUserId;
      this.save(value);
    } else {
      CustomValidators.validateAllFormFields(this.userForm);
    }
  }


  private save(user: User) {
    this.loaded = false;
    this.loadingMessage = 'Sending form...';
    this.userService.updateUser(user).subscribe((userResponse) => {
      this.user = Object.assign({}, userResponse);
      this.createForm();
      this.formSavedMessage = 'Form saved successfully';
      this.formSavedMessageTimeout = setTimeout(() => {
        this.formSavedMessage = null;
      }, 3000);
      this.loaded = true;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.loadingMessage = 'Loading form...';
    this.userService.getUserDetails(this.currentUserId)
      .subscribe(user => {
        this.user = Object.assign({}, user);
        this.createForm();
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.formSavedMessageTimeout);
  }

  reset() {
    this.userForm.reset();
    this.formSubmitStatus = false;
    this.formSavedMessage = null;
  }

}
