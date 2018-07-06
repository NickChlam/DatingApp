import { AuthGuard} from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { NavComponent } from './nav/nav.component';

import { AuthService } from './_services/auth.service';
import { ErrorHandlerService} from './_services/error-handler.service';
import { AlertifyService} from './_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap';


import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    HttpModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorHandlerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
