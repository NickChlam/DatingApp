import { Injectable, OnInit } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/Users';
import { Observable, of } from 'rxjs';
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
        catchError(this.handleError.ManageError)
      )
   }

   //call api/users/#id returns a single users detailed info
   getSingleUser(id): Observable<User>{
     return this.http.get<User>(this.baseUrl + 'users/' + id , this.jwt())
      .pipe(
        catchError(this.handleError.ManageError)
      )
   }

   // put request to update user - accept userId and user object 
   updateUser(id: number, user: User ){
    return this.http.put(this.baseUrl + 'users/'  + id, user, this.jwt())
      .pipe(
        catchError(err =>  of(err.error))
      )
   }

   setMainPhoto(userId: number, id : number ){
      return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}, this.jwt())

   }

   //http://192.168.50.95:5001/api/users/3102/photos/3065
   deletePhoto(userId: number, id: number){
     return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id, this.jwt());
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
