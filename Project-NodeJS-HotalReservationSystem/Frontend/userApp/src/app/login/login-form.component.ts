import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'login-form',
  template: `
  <nb-card accent="info">
    <nb-card-header>
    Login
    </nb-card-header>
    <nb-card-body id="login-form">
    <nb-card [nbSpinner]="loading" nbSpinnerStatus="primary">
    <nb-card-body>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" >
      <div formGroupName="userData">
        <div class="form-group">
          <label for="username" class="label">Username</label>
          <input nbInput fullWidth type="text"  id="username" formControlName="username">
        </div>
        <div class="form-group">
          <label for="password" class="label">Password</label>
          <input nbInput type="text" fullWidth  id="password" type="password" formControlName="password">
        </div>
        <br>
        <div class="centered">
         <button  nbButton status="primary" type="submit">Login</button><br/>
         <span class="small-text">or <a (click)="sendCode()" > send a one-time-access password</a></span>
         </div>

      </div>
      </form>
      </nb-card-body>
      </nb-card>
     
      
  </nb-card-body>
</nb-card>
    
  `,
  styles: [
  ]
})
export class LoginFormComponent {

  loginForm: FormGroup
  loading: Boolean = false
  returnUrl: string = ""
  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private router: Router, private route: ActivatedRoute, private toasterSerive: NbToastrService) {
    this.loginForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': [''],
        'password': [''],
      })
    });

    this.route.queryParams.subscribe(params => {
      if (params["returnUrl"]) {
        this.returnUrl = decodeURIComponent(params["returnUrl"])
      }

    })
  }

  onSubmit() {
    let userData = this.loginForm.get("userData").value;
    this.loading = true
    this.apiService.login(userData, this.onResponse)
  }

  onResponse = (data) => {
    this.loading = false
    if (data.success) {
      localStorage.setItem("username", data.username)
      localStorage.setItem("firstName", data.firstName)
      this.router.navigateByUrl("/" + this.returnUrl)
    }
    else {
      this.toasterSerive.show(
        'The credentials are not correct.',
        `Error`,
        { duration: 3000, status: 'danger', icon: 'close', destroyByClick: true });
    }
  }

  sendCode() {
    let userData = this.loginForm.get("userData").value;
    if (userData.username) {
      this.loading = true
      this.apiService.createAccessPassword(userData, this.onEmailSent)
    } else {
      this.toasterSerive.show(
        'Please enter the email associated to your account',
        `Warning`,
        { duration: 3000, status: 'warning', icon: 'info', destroyByClick: true });
    }

  }

  onEmailSent = (data) => {
    this.loading = false
    if (data.success == 1) {
      this.toasterSerive.show(
        'The one-time-access code has been sent to the email.',
        `Information`,
        { duration: 3000, status: 'info', icon: 'info', destroyByClick: true });
    } else {
      this.toasterSerive.show(
        'An error occurred when processing your request.',
        `Error`,
        { duration: 3000, status: 'danger', icon: 'close', destroyByClick: true });
    }

  }


}
