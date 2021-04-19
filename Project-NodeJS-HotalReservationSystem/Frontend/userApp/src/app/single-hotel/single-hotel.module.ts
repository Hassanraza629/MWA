import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbListModule } from '@nebular/theme';
import { SingleHotelComponent } from './single-hotel.component';
import { RouterModule } from '@angular/router';
import { ReservationComponent } from '../reservation/reservation.component';
import { AuthenticateGuard } from '../guards/authenticate.guard';

@NgModule({
  declarations: [
    SingleHotelComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: SingleHotelComponent },
    ]),
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
  ]
})
export class SingleHotelModule { }
