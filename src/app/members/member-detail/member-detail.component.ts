import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/Users';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private Alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.loadUser();
  }

  // + convert to number 
  // recieve id from route params set in routes.ts when user clicks 
  // card detail link [routerLink]="['/members/', user.id]"
  // set new route  {path: 'members/:id',component: MemberDetailComponent},
  loadUser(){
    this.userService.getSingleUser(+this.route.snapshot.params['id'])
      .subscribe( (user: User) => {
        this.user = user; 
      }, error => this.Alertify.error(error))
  }
}
  