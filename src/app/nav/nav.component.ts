import { Component, OnInit } from '@angular/core';


import {AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor( private auth: AuthService, private Alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  

  login(){
   
    this.auth.login(this.model).subscribe(data => {
      this.Alertify.success("logged In");
    }, err => {
      this.Alertify.error('failed to login')
    }, () => {
      this.router.navigate(['/members'])
    } )
    this.model = {};
  }

  logout(){
    this.auth.userToken = null;
    localStorage.removeItem('token');
    this.Alertify.error("logged Out");
    this.router.navigate(['/home']);
  }

  
  loggedIn(){
    
    return this.auth.loggedIn()
    
  }
}
