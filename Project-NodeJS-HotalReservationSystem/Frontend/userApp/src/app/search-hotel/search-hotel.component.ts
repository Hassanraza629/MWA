import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search-hotel',
  template: `
    <form [formGroup] ="searchForm"  (ngSubmit)="onSubmit()">
     
      <nb-card c>
        <nb-card-body class="search-bar" >
        
        <input type="text" nbInput  shape="round" placeholder="Enter the hotel name" formControlName="Location">
       
        <input [nbDatepicker]="checkInTime" placeholder="CheckIn" nbInput formControlName="checkinTime" class="datePicker">
        <nb-datepicker #checkInTime ></nb-datepicker>

        <input [nbDatepicker]="checkOutTime" placeholder="CheckOut" nbInput formControlName="checkOutTime" class="datePicker">
        <nb-datepicker #checkOutTime ></nb-datepicker>
        <button nbButton shape="round" size="small" status="success" id="searchBtn" class="datePicker">Search</button>
        
        </nb-card-body>
      </nb-card>

    </form>

    <nb-list nbInfiniteList [threshold]="500" >
    <nb-list-item *ngFor="let item of this.res_data" class="body">
        

      <nb-card status="success">
        <nb-card-header>{{item.name}}</nb-card-header>
        
        <nb-card-body class ="hotal_dis">
        
        <div class="main_div">
          <div class="block_size">
           <img [src]="item.image" alt="Hotel Picture" class="hotalpic"/>
          </div>
          <div class="block_mid">
            <p style="color:#F6AB3F " > Rating: {{item.rating}} &#9733;</p>
            <p class="detail-text" style="line-height: 5px;"> &#9881; {{item.address}} </p> 
            <p class="detail-text" style="line-height: 5px;">&#9742;   {{item.contact}} </p>
            <p class="detail-text" id="email" style="line-height: 5px;">&#9993; {{item.email}} </p>
            
            
            
          </div>
          <div class="block_size">
          <p class ="detailBox"><button nbButton shape="round" size="small" status="success" class="viewDetailBtn" (click)="GoToHotelPage(item.name)">View Rooms <i class="material-icons"></i> </button></p>
          
          </div>
        </div>
        </nb-card-body>
        
   </nb-card>
    <div>
        
    </div>
    
    </nb-list-item>
    </nb-list>
  `,
  styles: [
  ]
})
export class SearchHotelComponent {
  searchForm: FormGroup;

  location: string;
  CheckInTime: string;
  CheckOutTime: string;

  // Query Params to search Hotel
  fromDate = "";
  ToDate = "";


  res_data;
  constructor(private formBuilder: FormBuilder, public apiService: ApiService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {

      this.location = params['name'] ?? "";
      this.CheckInTime = params['fromDate'] ?? new Date();
      this.CheckOutTime = params['ToDate'] ?? new Date();;
      console.log("subscribe : onit : location  : " + location + "ckIn:" + this.fromDate + "ckOut:" + this.ToDate)
      this.apiService.search({ location: this.location, checkInTime: this.CheckInTime, checkOutTime: this.CheckOutTime }, this.onResponse);
    })
    this.searchForm = formBuilder.group({

      'Location': [this.location],
      'checkinTime': [this.CheckInTime, Validators.required],
      'checkOutTime': [this.CheckOutTime, Validators.required],


    });
    console.log(" grou1: onit : location  : " + location + "ckIn:" + this.fromDate + "ckOut:" + this.ToDate)

  }

  onSubmit() {
    let location = this.searchForm.get("Location").value;

    this.fromDate = this.ConvertDateFormat("checkinTime");
    this.ToDate = this.ConvertDateFormat("checkOutTime");
    /*let ChkIn= checkInTime
    let month = ChkIn[1];
    
    let Month = this.convertMonthStringToInt(month);
    let day = ChkIn[2];
    let year = ChkIn[3];*/
    console.log(" onit : location  : " + location + "ckIn:" + this.fromDate + "ckOut:" + this.ToDate)
    this.router.navigateByUrl(`/search?name=${location}&fromDate=${this.fromDate}&ToDate=${this.ToDate}`)

  }

  /// Convert Control Date format to DB Format
  ConvertDateFormat(date) {
    let Time = new Date(this.searchForm.get(date).value);

    let f_month = this.AddZeroToMonth((Time.getMonth() + 1));

    return Time.getFullYear() + '-' + f_month + '-' + Time.getDate();

  }
  AddZeroToMonth(month) {
    if (month <= 9)
      return '0' + month;
    else
      return month;

  }



  onResponse = (data) => {
    this.res_data = data;

  }

  GoToHotelPage(name) {
    let CheckInDate = this.ConvertDateFormat("checkinTime");
    let CheckOutDate = this.ConvertDateFormat("checkOutTime");
    console.log(" GoTopage :location  : " + name + "ckIn:" + CheckInDate + "ckOut:" + CheckOutDate)
    this.router.navigateByUrl(`/hotel?name=${name}&fromDate=${CheckInDate}&ToDate=${CheckOutDate}`)
  }
}
