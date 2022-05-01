import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router,
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1 ) {
          console.log("rrrrrr" , currentUser.role)
          // role not authorised so redirect to home page
          this.router.navigate(['/auth']);
          return false;
         }
    

         
         

      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
