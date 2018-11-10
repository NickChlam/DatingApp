import { User } from "../_models/Users";
import { Resolve, Router, ActivatedRouteSnapshot} from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class MemberListResolver implements Resolve<User[]>
{
    pageNumber = 1;
    pageSize = 30;
    constructor(private userService: UserService,
        private router: Router, 
        private Alertify: AlertifyService ){}

        resolve(route:ActivatedRouteSnapshot): Observable<User[]>{
            return this.userService.getUsers(this.pageNumber, this.pageSize)
                .pipe(
                    catchError( error => {
                        this.Alertify.error(error);
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                )
        }

    
}