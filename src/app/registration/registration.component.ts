import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseAuthService} from "../firebase-auth.service";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';

  constructor(
              private router: Router,
              private auth: FirebaseAuthService) {
  }

  onSubmit() {

      this.auth.signup(this.email, this.password);
      this.router.navigate(['/signin']);

  }
}
