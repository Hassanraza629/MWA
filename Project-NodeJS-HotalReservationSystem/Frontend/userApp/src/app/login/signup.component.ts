import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastRef, NbToastrService } from '@nebular/theme';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  template: ` <nb-card accent="primary" >
  <nb-card-header>
  Sign up - Please complete the details
  </nb-card-header>
  <nb-card-body id="login-form">
  <nb-card [nbSpinner]="loading" nbSpinnerStatus="primary">
  <nb-card-body>
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" >
    <div  style="padding:0% 10%">

      <div class="form-group">
        <label for="first-name" class="label">First Name</label>
        <input [status]="getStatus(firstName)" nbInput fullWidth type="text"  id="first-name" formControlName="firstName">
        
      </div>

      <div class="form-group">
        <label for="last-name" class="label">Last Name</label>
        <input nbInput [status]="getStatus(lastName)" fullWidth type="text"  id="last-name" formControlName="lastName">
      </div>
      <div class="form-group">
        <label for="username" class="label">Username</label>
        <input nbInput [status]="getStatus(username)" fullWidth type="text"  id="username" formControlName="username">
      </div>
      <div class="form-group">
        <label for="password" class="label">Password</label>
        <input nbInput [status]="getStatus(password)" type="text" fullWidth  id="password" type="password" formControlName="password">
      </div>
      
      <br>
      <div class="centered">
       <button  nbButton status="primary" type="submit">Submit</button>
       </div>
       
    </div>
    </form>
    </nb-card-body>
    </nb-card>

    
</nb-card-body>
</nb-card>`,
  styles: [
  ]
})
export class SignupComponent {


  signupForm: FormGroup
  loading: Boolean = false

  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private router: Router, private toasterSerive: NbToastrService) {
    this.signupForm = formBuilder.group({
      'firstName': ['', Validators.pattern('[A-Za-z ]{3,32}')],
      'lastName': ['', Validators.pattern('[A-Za-z ]{3,32}')],
      'username': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
    });
  }

  onSubmit() {
    let userData = this.signupForm.value
    this.loading = true;
    this.apiService.signup(userData, this.onResponse)

  }

  onResponse = (data) => {
    this.loading = false;
    if (data.success == 1) {
      localStorage.setItem("username", data.username)
      localStorage.setItem("firstName", this.firstName.value)
      this.router.navigateByUrl("/")
    } else if (data.error == "duplicated") {

      this.toasterSerive.show(
        'The email is already registered',
        `Error`,
        { duration: 3000, status: 'danger', icon: 'close', destroyByClick: true });

    }
    else {
      alert("An error ocurred, please try again")
    }
  }

  get firstName() { return this.signupForm.get('firstName'); }

  get lastName() { return this.signupForm.get('lastName'); }

  get username() { return this.signupForm.get('username'); }

  get password() { return this.signupForm.get('password'); }

  getStatus(input) {
    if (input.valid && input.touched)
      return "success"
    else if (!input.valid && input.touched)
      return "danger"
    else
      return "default"
  }

}
