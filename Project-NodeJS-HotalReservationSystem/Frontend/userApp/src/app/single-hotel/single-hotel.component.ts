import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'single-hotel',
  templateUrl: './single-hotel.html',
  styleUrls: ['./single-hotel.css']
})
export class SingleHotelComponent implements OnInit {
  public hotel: any;
  name: string;
  fromDate : string;
  ToDate : string;
  
  constructor(private apiService: ApiService, private router: Router, private activatedRoute : ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.name= params['name']
      this.fromDate= params['fromDate']
      this.ToDate = params['ToDate']
    })
  }
  
  ngOnInit(): void {
    this.apiService.getHotelInfo({name:this.name, checkInTime: this.fromDate, checkoutTime:this.ToDate}, this.onResponse);
  }

  onResponse = (data) => {
    this.hotel = data.hotel;
  }

  sendDataToReservation = async (id, price) => {
    this.router.navigateByUrl(`/reservation?name=${this.name}&fromDate=${this.fromDate}&toDate=${this.ToDate}&room=${id}&price=${price}`)
  }
}


