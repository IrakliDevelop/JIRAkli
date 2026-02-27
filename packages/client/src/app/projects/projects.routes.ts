import { Routes } from '@angular/router';
import { authGuard } from '../core';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./project-list/project-list.component').then((m) => m.ProjectListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./project-create/project-create.component').then((m) => m.ProjectCreateComponent),
    canActivate: [authGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./project-detail/project-detail.component').then((m) => m.ProjectDetailComponent),
    canActivate: [authGuard],
  },
];
