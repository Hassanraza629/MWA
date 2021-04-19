import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-my-reservations',
  template: `
  <nb-card  >
  <nb-card-header>
    My Reservations
  </nb-card-header>
  <nb-card-body>
  <nb-card >
    <nb-card-body>
      <nb-list>
        <nb-list-item *ngFor="let item of reservations">
        <nb-card accent='success' class='fullWidth inline'  >
        <div class = "left-container">
                <img [src]="item.hotel.image" class="reservation-img" />
            </div> 
              
            <div class = "right-container">
                <h5>{{item.hotel.name}}</h5>
                <span>From: {{castDate(item.reservation.fromDate)}}</span><br/>
                <span>To: {{castDate(item.reservation.toDate)}}</span><br/><br/>
                <button nbButton shape="round" size="small" status="danger" 
                  (click)="delete(item)">
                Delete
                </button>
            </div>
              

          </nb-card  >
        </nb-list-item>
      </nb-list>
    </nb-card-body>
  </nb-card>
  `,
  styles: [
  ]
})
export class MyReservationsComponent implements OnInit {

  reservations = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations = () => {
    this.apiService.getReservations(this.onResponse);
  }
  onResponse = (data) => this.reservations = data

  castDate(date) {

    return (new Date(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  delete(data) {
    const path = 'reservation/' + data.reservation._id;

    this.apiService.deleteReservation(path, this.onDelete);
  }

  onDelete = (status) => {
    this.getReservations();
  }
}
