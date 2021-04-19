import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NbContextMenuModule, NbIconModule, NbListModule, NbMenuModule, NbMenuService, NbThemeModule, NbToastrModule, NbUserModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { NbCardModule } from '@nebular/theme';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { NbInputModule } from '@nebular/theme';
import { NbDatepickerModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbActionsModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SessionInterceptor } from './guards/session.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingConfirmationComponent } from './reservation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchHotelComponent
  ],
  imports: [

    RouterModule.forRoot([
      { path: '', component: SearchHotelComponent },
      { path: 'login', redirectTo: "auth/login" },
      { path: 'signup', redirectTo: " auth/signup" }
      ,
      { path: 'reservation', loadChildren: () => import("./reservation/reservation.module").then(m => m.ReservationModule) },
      {
        path: 'auth', loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
      }, {
        path: 'profile', loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
      },
      { path: 'search', component: SearchHotelComponent },
      { path: 'confirmed', component: BookingConfirmationComponent },
      { path: 'hotel', loadChildren: () => import("./single-hotel/single-hotel.module").then(m => m.SingleHotelModule) },
    ]),

    NbThemeModule.forRoot(),
    NbLayoutModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbInputModule, // added by hassan
    NbDatepickerModule.forRoot(), // added by hassn  fro date picker control
    NbDatepickerModule,
    NbButtonModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbListModule,
    NbToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ApiService, NbMenuService, { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
