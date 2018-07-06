import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService} from '../_services/auth.service';
import { Router } from '@angular/router';
import {AlertifyService} from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private auth: AuthService, private router:Router, private alertify: AlertifyService){

}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.loggedIn()){
      return true;
    }
    // notify user to log in and redirect home
    this.alertify.error('You need to be Logged in to access the area');
    this.router.navigate(['/home'])
    return false;
  }
}
