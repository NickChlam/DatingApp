import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/Users";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(
            private userService: UserService,
            private router: Router,
            private Alertify: AlertifyService){}

            resolve(route:ActivatedRouteSnapshot): Observable<User>{
                return this.userService.getSingleUser(route.params['id'])
                    .pipe(
                        catchError( () => {
                            this.Alertify.error('problem retrieving data');
                            this.router.navigate(['/members']);
                            return of(null);
                        })
                    )
        }

}