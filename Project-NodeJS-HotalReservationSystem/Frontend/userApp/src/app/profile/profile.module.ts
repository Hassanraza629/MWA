import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { NbListModule } from '@nebular/theme';
import { AuthenticateGuard } from './../guards/authenticate.guard';


@NgModule({
  declarations: [
    MyReservationsComponent
  ],
  imports: [

    CommonModule,
    RouterModule.forChild([
      { path: 'my-reservations', component: MyReservationsComponent, canActivate: [AuthenticateGuard] },

    ]),
    NbCardModule,
    NbListModule,
    NbButtonModule
  ]
})
export class ProfileModule { }
