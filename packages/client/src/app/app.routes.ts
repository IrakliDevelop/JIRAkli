import { Routes } from '@angular/router';
import { authGuard } from './core';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.routes').then((m) => m.PROJECT_ROUTES),
  },
  {
    path: 'projects/:projectId/tickets',
    loadChildren: () => import('./tickets/tickets.routes').then((m) => m.PROJECT_TICKET_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.routes').then((m) => m.TICKET_ROUTES),
  },
];
