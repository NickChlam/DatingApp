// @angular modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';

// routing and guards
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';

// services 
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { ErrorHandlerService} from './_services/error-handler.service';
import { AlertifyService} from './_services/alertify.service';

// 3rd Part Modules
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

// components
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NavComponent } from './nav/nav.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditComponent } from './members/photo-edit/photo-edit.component';

// resolvers
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorHandlerService,
    AuthGuard, 
    PreventUnsavedChanges,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
