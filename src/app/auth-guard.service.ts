import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FirebaseAuthService} from "./firebase-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: FirebaseAuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuth$.pipe(
      map(isAuth => {
        if (isAuth) {
          return true; // Allow access
        } else {
          this.router.navigate(['signin']); // Navigate to home if not authenticated
          return false; // Block access
        }
      })
    );
  }
}
