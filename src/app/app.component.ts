import { Component, OnInit } from '@angular/core';
import { AuthService} from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app';

  constructor(private auth: AuthService){

  }
  ngOnInit(){
    const helper = new JwtHelperService()
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if(token){
      this.auth.decodedToken =  helper.decodeToken(token);
    }
    if(user){
      this.auth.currentUser = user;
      this.auth.changeMemberPhoto(user.photoUrl);
    }

  }

}
