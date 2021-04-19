import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: `
  <nb-layout center>
  <nb-layout-header style="layout-background-color:blue">

  <img class="clickable" [routerLink]="['/']" src="./assets/hotel-icon.png" alt="page logo" height="75px" width="80px" />
   <h1 class="clickable" [routerLink]="['/']">MIU Hotels</h1>
   <div class="header-container">
   <div *ngIf="username != ''">
          <nb-user class="header-menu" shape="rectangle" color="rgb(158 185 220)" [name]="firstName"
          [title]="username + ' ▼'"
          [nbContextMenu]="items"
          nbContextMenuTag="my-context-menu">
          <nb-icon icon="person" ></nb-icon>
        </nb-user>
        
        </div>
    </div>
    <div *ngIf="username == ''" class="login-header">
    <a href="auth/login" nbButton  shape="semi-round" size="tiny"  status="info" style="margin-right:10px"> 
    <nb-icon icon="person" ></nb-icon>
      Login
    </a>
    <a href="auth/signup" nbButton  shape="semi-round" size="tiny"  status="primary"> 
    <nb-icon icon="person-add" ></nb-icon>
      Signup
    </a> 
    </div>
  </nb-layout-header>

  <nb-layout-column>
  <router-outlet></router-outlet>
  </nb-layout-column>
    
  <nb-layout-footer>Contact us: <strong> &nbsp;mydear-support@mail.com</strong></nb-layout-footer>
</nb-layout>`,
  styles: [`
:host nb-layout-header ::ng-deep nav {
 
}
`],
})

export class AppComponent implements OnInit, DoCheck {
  items = [
    { title: 'My Reservations' },
    { title: 'Logout' },
  ];
  firstName: string = ""
  username: string = ""
  constructor(private nbMenuService: NbMenuService, private router: Router, private apiService: ApiService) { }

  ngDoCheck(): void {
    this.firstName = localStorage.getItem("firstName") && localStorage.getItem("firstName") !== "undefined" ? this.capitalize(localStorage.getItem("firstName")) : ""
    this.username = localStorage.getItem("firstName") && localStorage.getItem("username") !== "undefined" ? localStorage.getItem("username") : ""

  }



  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        let url = "";
        switch (title) {
          case "My Reservations":
            this.router.navigateByUrl("profile/my-reservations")
            break;
          case "Logout":
            this.logout();
            break
        }
      });
  }

  logout() {
    this.apiService.logout((data) => {
      if (data.success) {
        localStorage.setItem("username", "undefined")
        localStorage.setItem("firstName", "undefined")
        this.router.navigateByUrl("/")
      }

    })
  }



  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  }


}
