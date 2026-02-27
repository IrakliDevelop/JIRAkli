import { Routes } from '@angular/router';
import { guestGuard } from '../core';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [guestGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
