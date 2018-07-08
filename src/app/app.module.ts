// @angular modules 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';

// routing and guards
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';

// services 
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { ErrorHandlerService} from './_services/error-handler.service';
import { AlertifyService} from './_services/alertify.service';

// components
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NavComponent } from './nav/nav.component';

// 3rd Part Modules
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';


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
    MemberDetailComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    HttpModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorHandlerService,
    AuthGuard, 
    UserService,
    MemberDetailResolver,
    MemberListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
