import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/Users';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  //pass in User from member list in parent component
  @Input() user: User;
  constructor() { }

  ngOnInit() {
    
  }

}
