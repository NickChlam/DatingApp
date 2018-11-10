import { Component, OnInit } from '@angular/core';

import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/Users';
import {  ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  
  constructor( private userService: UserService,
               private alertify: AlertifyService,
               private route: ActivatedRoute
              ) { }

  ngOnInit() {
    // replaced with Resolver 
    // this.loadUsers();
   
    this.route.data.subscribe( data =>  {
      this.users = data['users'].result;
    });
     
   
  }

  // loadUsers() {
    
  //   this.userService.getUsers().subscribe( (users: User[]) => {
  //    this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
