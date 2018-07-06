import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes =[
    {path: 'home',component: HomeComponent},
    {
        //create multiple routes that are gaurded 
        // add child routes to dummy route and they will be protected by auth guard
        path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members',component: MemberListComponent},
            {path: 'messages',component: MessagesComponent},
            {path: 'lists',component: ListsComponent},
        ]
    },
  
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];