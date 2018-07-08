import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/Users';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery'; 

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private Alertify: AlertifyService
    ) { }

  ngOnInit() {
    // use a resolver to get the data before the component is loaded
    this.route.data.subscribe(data => {
    this.user = data['user'];
    })
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4, 
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  } 

  getImages(){
    const imageUrls = [];
    for(let i = 0; i < this.user.photos.length; i++){
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      })
    }
    return imageUrls;
  }

  // + convert to number 
  // recieve id from route params set in routes.ts when user clicks 
  // card detail link [routerLink]="['/members/', user.id]"
  // set new route  {path: 'members/:id',component: MemberDetailComponent},

  //no longer neccessary with resolver in place 
  // loadUser(){
  //   this.userService.getSingleUser(+this.route.snapshot.params['id'])
  //     .subscribe( (user: User) => {
  //       this.user = user; 
  //     }, error => this.Alertify.error(error))
  // }
}
  