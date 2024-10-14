import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {ProduitService} from "./produit.service";
import {CategoryService} from "./navbar/category.service";
import {SharedService} from "./shared-service.service";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), ProduitService, CategoryService, SharedService, AuthService, AuthGuardService
  ]
};
