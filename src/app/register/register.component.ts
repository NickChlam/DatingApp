import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService} from '../_services/alertify.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};

@Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private Alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe( () => {
       this.Alertify.success("Succesfully Registered");
    }, err => {
      this.Alertify.error(err)
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
   
  }

}
