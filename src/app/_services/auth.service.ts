import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import {map, catchError} from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  dotnet watch run --urls http://0.0.0.0:5001
  //  dotnet watch run --urls http://0.0.0.0:5001
  baseUrl = "https://localhost:5001/api/auth"
  //baseUrl = "http://192.168.50.95:5001/api/auth"
  userToken: any; 
  decodedToken: any;
  user: any;

  constructor(private NewHttp : HttpClient, private http: Http) { }

  login(model:any){
    const helper = new JwtHelperService();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.NewHttp.post(this.baseUrl + '/login', model, httpOptions)
          .pipe(
            map( response => {
              this.user  = response;
              if(this.user) {
              localStorage.setItem('token', this.user.tokenString);
              this.userToken = this.user.tokenString;
              this.decodedToken = helper.decodeToken(this.user.tokenString);
            
              }
        }), catchError(this.HandleError)
      )//end pipe

    }
    register(model: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.NewHttp.post(this.baseUrl + '/register', model, httpOptions )
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
