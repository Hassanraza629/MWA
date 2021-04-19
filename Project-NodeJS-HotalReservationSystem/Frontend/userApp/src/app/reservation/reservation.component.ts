import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reservation',
  template: `
  <nb-card status="warning">
  <nb-card-header>Please Confirm the Booking details</nb-card-header>
        
    <nb-card-body >
    
      <div>
         <div>           
            <h4>Booking Details</h4>
            <hr>
            <table class="heading">
            <tr>
              <th style="text-align:left">Booking:</th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <th style="text-align:left">CheckIn:</th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <th style="text-align:left">CheckOut:</th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <th style="text-align:left">Total:</th>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <th style="text-align:left">status:</th>
            </tr>
            <tr>
              <td>{{this.name}}</td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <td>{{this.fromDate }}</td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <td>{{this.toDate }}</td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <td>{{this.price}}  </td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <td>  pending</td>
            </tr>
            </table>
         </div>
      </div>
      <hr>
      <button nbButton shape="round" size="small" status="success" class="viewDetailBtn" (click)="reserve()">
                Confirm
            </button>
    </nb-card-body>
          
   </nb-card>
  `
})
export class ReservationComponent implements OnInit {
  name: string;
  fromDate: string;
  toDate: string;
  room: string; 
  price: string;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name']
      this.fromDate = params['fromDate']
      this.toDate = params['toDate']
      this.room = params['room']
      this.price = params['price']
    })
  }

  ngOnInit(): void {
  }

  reserve = () => {
    const reservations = {
      "fromDate": this.fromDate,
      "toDate": this.toDate,
      "User" : {
        "username" : localStorage.getItem("username"),
        "Name" : localStorage.getItem("firstName")
      }
    };
    const path = "hotel/" + this.name + "/" + this.room;  
    this.apiService.reserve(reservations, path, this.onResponse);
  }

  onResponse = (data)=> {
    console.log(data);
    this.router.navigateByUrl(`/confirmed?name=${this.name}&fromDate=${this.fromDate}&toDate=${this.toDate}&room=${this.room}&price=${this.price}`)
  }
}