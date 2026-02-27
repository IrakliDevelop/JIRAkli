import { Routes } from '@angular/router';
import { authGuard } from '../core';

export const TICKET_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./ticket-detail/ticket-detail.component').then((m) => m.TicketDetailComponent),
    canActivate: [authGuard],
  },
];

// Route for creating tickets (nested under projects)
export const PROJECT_TICKET_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./ticket-create/ticket-create.component').then((m) => m.TicketCreateComponent),
    canActivate: [authGuard],
  },
];
