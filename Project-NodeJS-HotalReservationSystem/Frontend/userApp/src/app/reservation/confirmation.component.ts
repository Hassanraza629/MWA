import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  template: `
  <nb-card status="success">
  <nb-card-header>Booking Confirmation</nb-card-header>
        
    <nb-card-body >
    
      <div >
          <h1 >Confirmation......!</h1>
         <div>
            <p>We are pleased to inform you that your reservation request has been received and confirmed</p>
            <br>
            <p>Thank You!</p>
           
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
              <td>  confirmed</td>
            </tr>
            </table>
         </div>
      </div>
    </nb-card-body>
          
   </nb-card>
  `
})
export class BookingConfirmationComponent implements OnInit {
  name: string;
  fromDate: string;
  toDate: string;
  room: string; 
  price: string;

  constructor(private activatedRoute: ActivatedRoute) { 
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
}