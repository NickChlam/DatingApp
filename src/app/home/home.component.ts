import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {ErrorHandlerService} from '../_services/error-handler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: HttpClient, private handleError: ErrorHandlerService ) { }

  ngOnInit() {
   this.getValues();
 
  }

  registerToggle(){
    this.registerMode = true;
  }

  getValues(){
    
    this.http.get("http://localhost:5000/api/values")
    .subscribe(response => {
      this.values = response;
    }, err => console.log(err));
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;

  }

}