import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router, RouterLink} from "@angular/router";
import {FirebaseAuthService} from "../firebase-auth.service";

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private auth: FirebaseAuthService) {
  }

  onSubmit() {
    this.auth.login(this.email, this.password).then((res: any) => {
      const token = res.user.multiFactor.user.accessToken;
      localStorage.setItem('accessToken', token);
    });
    this.router.navigate(['/home']);
  }


}
