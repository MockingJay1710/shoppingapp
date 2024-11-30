import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

  private defaultUser = {
    name: 'EL MEJBAR Otmane',
    email: 'elmejbarotmane@gmail.com',
    password: '123456',
    profilePicture: 'assets/default-profile.png'
  };

  private userSubject = new BehaviorSubject<any>(this.defaultUser);
  user$ = this.userSubject.asObservable();

  constructor(private auth: AngularFireAuth) {
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser)); // Set the userSubject to stored user
      }

      const storedAuthState = localStorage.getItem('isAuth');
      if (storedAuthState) {
        this.isAuth.next(JSON.parse(storedAuthState)); // Restore authentication state
      }
    }
  }

  login(email: string, password: string) {
    this.isAuth.next(true);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.isAuth.next(false);
    return this.auth.signOut();
  }

  isLoggedIn() {
    return this.isAuth.value;
  }

  getUser() {
    return this.userSubject.value;
  }

  // Update user profile
  updateUser(updatedUser: any) {
    this.userSubject.next(updatedUser);
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }

  // Utility method to check if we're in a browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  async getUserId(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.uid : null;
  }
}
