import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/Users";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private router: Router,
        private Alertify: AlertifyService,
        private authService: AuthService
    ){}

    resolve(route:ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getSingleUser(this.authService.decodedToken.nameid)
            .pipe(
                catchError( () => {
                    this.Alertify.error('problem retrieving data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            )
}
}