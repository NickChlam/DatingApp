import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;
  errorMessages = [];

  constructor(private http: HttpClient) { }
    
  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.http.get("https://localhost:5001/api/values0")
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(response => {
      this.values = response;
    });
  }

  private handleError(error: HttpErrorResponse) {
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

}
