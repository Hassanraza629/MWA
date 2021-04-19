import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ApiService {

  apiUrl = "http://localhost:3000/api/";
  constructor(public http: HttpClient) {

  }

  login(user: { username: string, password: string, }, callback) {

    this.http.post(this.apiUrl + "login", user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(data => {
        callback(data);

      })
  }

  createAccessPassword(user: { username: string, }, callback) {

    this.http.post(this.apiUrl + "create-password", user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(data => {
        callback(data);

      })
  }

  signup(user: { firstName: string, lastName: string, username: string, password: string, }, callback) {

    this.http.post(this.apiUrl + "signup", user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(data => {
        callback(data)

      })
  }

  search(query: { location: string, checkInTime: string, checkOutTime: string, }, callback) {
    this.http.get(this.apiUrl + `search?name=${query.location}&fromDate=${query.checkInTime}&ToDate=${query.checkOutTime}`
    ).subscribe(data => {
      console.log(data);
      callback(data);
    })
  }

  getHotelInfo(query: { name: string, checkInTime: string, checkoutTime: string }, callback) {
    this.http.get(this.apiUrl + `hotel?name=${query.name}&fromDate=${query.checkInTime}&ToDate=${query.checkoutTime}`).subscribe((data) => {
      console.log(data);
      callback(data);
    });
  }

  reserve(
    reservation: { fromDate: string, toDate: string, User: { username: string, Name: string } },
    path: string, callback
  ) {
    this.http.post(this.apiUrl + path, reservation,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(status => callback(status));
  }

  getReservations(callback) {
    this.http.post(this.apiUrl + "profile/reservations", {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(data => {
        callback(data)

      })
  }

  deleteReservation(path, callback) {
    this.http.delete(this.apiUrl + path,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(status => {
        callback(status)
      })
  }

  logout(callback) {
    this.http.post(this.apiUrl + "logout", {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }).subscribe(data => {
        callback(data)

      })
  }
}

