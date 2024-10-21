import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {ProduitService} from "./produit.service";
import {CategoryService} from "./navbar/category.service";
import {SharedService} from "./shared-service.service";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FirebaseAuthService} from "./firebase-auth.service";


const firebaseConfig = {
  apiKey: "AIzaSyCU_PjU3kXpaclr3Y7dWisFPXVCB0wwCwE",
  authDomain: "ecom-82444.firebaseapp.com",
  projectId: "ecom-82444",
  storageBucket: "ecom-82444.appspot.com",
  messagingSenderId: "477797322643",
  appId: "1:477797322643:web:64838e5f404e8b24ff6266",
  measurementId: "G-PCN3QWH4KR"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), ProduitService, CategoryService, SharedService, AuthService, AuthGuardService,
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(AngularFireAuth),
    importProvidersFrom(AngularFireAuthModule),
    FirebaseAuthService
  ]
};


