import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  // create a fileUploader with an empty object 
  uploader: FileUploader  = new FileUploader({});
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo; 

  constructor(private authService: AuthService,
            private userService: UserService, 
            private Alertify : AlertifyService,
            private route: ActivatedRoute) { }

  ngOnInit() {
   this.initializeUploader();
   console.log(this.photos)

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos', 
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 
    });
    
    this.uploader.onAfterAddingFile = file => {file.withCredentials = false; };
    this.uploader.getNotUploadedItems();
    // push the photo from the response to photos array to 
    this.uploader.onSuccessItem = (item, response, status, header) => {
      if (response) {
        const res : Photo = JSON.parse(response);
      
        const photo = {
          id: res.id,
          url: res.url,
          DateAdded: res.DateAdded,
          description: res.description,
          isMain: res.isMain
        };

        //TODO: remove api request and get updated photo id 
        this.userService.getSingleUser(this.authService.decodedToken.nameid).subscribe( user => {
          this.photos = user.photos;
        });
        this.photos.push(photo);
        
      }
    };


  }

setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(() => {
          this.currentMain = this.photos.filter(p => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      },err => {
        this.Alertify.error(err.error)
      });
        
  } 

deletePhoto(id: number){
  this.Alertify.confirm('Are you sure you want to delete', () => {
    
    this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe( () => {
      this.photos.splice(this.photos.findIndex(p => p.id === id ), 1);
      this.Alertify.success("Photo Has been Deleted")
    }, err => {
      this.Alertify.error("Failed to Delete");
    })
  })
}

getLastPhotoId(): number{
  return this.photos[this.photos.length -1].id +1;
}

}
