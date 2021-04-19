import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { AuthenticateGuard } from '../guards/authenticate.guard';
import { BookingConfirmationComponent } from './confirmation.component';


@NgModule({
  declarations: [
    ReservationComponent,
    BookingConfirmationComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ReservationComponent, canActivate:[AuthenticateGuard]}
    ]),
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class ReservationModule { }
