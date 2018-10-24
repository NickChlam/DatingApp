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
  photoUrl: String;
  constructor( private auth: AuthService, private Alertify: AlertifyService, private router: Router) { }

  ngOnInit() {  
    this.auth.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
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
    localStorage.removeItem('user');
    this.auth.decodedToken = null;
    this.auth.currentUser = null;
    this.Alertify.error("logged Out");
    this.router.navigate(['/home']);
  }

  
  loggedIn(){
    
    return this.auth.loggedIn()
  }
}
