import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { } from '@nebular/theme';
import { SignupComponent } from './signup.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [LoginFormComponent, SignupComponent],
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupComponent }

    ]),
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbEvaIconsModule,
    NbIconModule,
  ]
})
export class LoginModule { }
