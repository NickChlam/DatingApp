import { Injectable, OnInit } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/Users';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../_services/error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private handleError: ErrorHandlerService) {
   }

   ngOnInit(){}

   //call api/users returns list of all users 
   getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + 'users', this.jwt())
      .pipe(
        catchError(this.handleError.HandleError)
      )
   }

   //call api/users/#id returns a single users detailed info
   getSingleUser(id){
     return this.http.get(this.baseUrl + 'users/' + id , this.jwt())
      .pipe(
        catchError(this.handleError.HandleError)
      )
   }

   
   private jwt(){
     let token = localStorage.getItem('token');
     if(token)
     {
       // add to headers
       const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  'Bearer ' + token,
          'Content-Type':  'application/json'
        })
      };
      return httpOptions;
     }

   }
}
