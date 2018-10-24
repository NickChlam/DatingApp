import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import {map, catchError} from 'rxjs/operators';
import { throwError, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  dotnet watch run --urls http://0.0.0.0:5001
  //  dotnet watch run --urls http://0.0.0.0:5001
 // baseUrl = "https://localhost:5001/api/auth"
 // baseUrl = "http://192.168.50.95:5001/api/auth"
 // ng serve --host=0.0.0.0 --disable-host-check
  baseUrl = environment.apiUrl
  userToken: any; 
  decodedToken: any;
  user: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<String>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();



  constructor(private NewHttp : HttpClient, private http: Http) { }

  // use behavior subjects next method to update photoUrl 
  changeMemberPhoto(photoUrl:string){
    this.photoUrl.next(photoUrl);
  }

  login(model:any){
    const helper = new JwtHelperService();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.NewHttp.post(this.baseUrl + 'auth/login', model, httpOptions)
          .pipe(
            map( response => {
              this.user  = response;
              if(this.user) {
              localStorage.setItem('token', this.user.tokenString);
              localStorage.setItem('user', JSON.stringify(this.user.user));
              this.userToken = this.user.tokenString;
              this.decodedToken = helper.decodeToken(this.user.tokenString);
              this.currentUser = this.user.user;
              this.changeMemberPhoto(this.currentUser.photoUrl)
            
              }
        }), catchError(this.HandleError)
      )//end pipe

    }
    register(user: User){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.NewHttp.post(this.baseUrl + 'auth/register', user, httpOptions )
      .pipe(
        catchError(this.HandleError)
      )//end pipe
      
    }

    loggedIn(){
      // TODO: refactor; service is constanlty bieng called on *ngIf to dispplay 
      this.userToken = localStorage.getItem('token');
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(this.userToken);
      return !isExpired;
    }

    public oldLogin(model:any){
      const headers = new Headers({'Content-type': 'application/json'});
      const options = new RequestOptions({headers:headers});
      
      return this.http
      .post(this.baseUrl,  model, options)
    
    }

    private HandleError(error:any){
      console.log(error);
      const err = error.error;
      var errorMessage = "";
      if(err === null){
        errorMessage = "Invalid Login";
      }else
      {
        for (var property in err) {
          errorMessage = errorMessage + err[property] + '\n';
        }
      } 
      return throwError(errorMessage);
    }
}
