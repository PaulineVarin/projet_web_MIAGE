import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationUserService } from '../authentication-user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private AuthenticationUserService: AuthenticationUserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.AuthenticationUserService.userValue;
        if (user) {
            // authorised so return true
            return localStorage.getItem('user') != null;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['listerEvenement'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}