import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/Users';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  photoUrl: String;
  @ViewChild('editForm') editForm: NgForm;
  
  constructor(private route: ActivatedRoute, private Alertify: AlertifyService,private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    })
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }
  updateUser(){
    
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe( next => {
    this.Alertify.success("Updated Profile");
    this.editForm.resetForm(this.user);
    console.log(this.authService.decodedToken.nameid)
    }, err => {
      this.Alertify.error(err)
    })
    
  }

  updateMainPhoto(photoUrl){
   this.user.photoUrl = photoUrl;
   

  }

}
