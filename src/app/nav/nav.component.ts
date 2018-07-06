import { Component, OnInit } from '@angular/core';


import {AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor( private auth: AuthService, private Alertify: AlertifyService) { }

  ngOnInit() {
  }

  

  login(){
   
    this.auth.login(this.model).subscribe(data => {
      this.Alertify.success("logged In");
    }, err => {
      this.Alertify.error(err)
    })
  }

  logout(){
    this.auth.userToken = null;
    localStorage.removeItem('token');
    this.Alertify.error("logged Out");
  }

  
  loggedIn(){
    
    return this.auth.loggedIn()
    
  }
}
