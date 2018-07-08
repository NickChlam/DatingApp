import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public ManageError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.' );
  };

  
  public HandleError(error:any){
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
