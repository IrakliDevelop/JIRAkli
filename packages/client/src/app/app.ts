import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthStateService, ThemeService } from './core';
import { AuthService } from './auth/auth.service';
import { MatDivider } from "@angular/material/divider";
import { LogoComponent } from './shared';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDivider,
    LogoComponent
],
  template: `
    @if (isAuthenticated()) {
      <!-- Navigation Bar -->
      <header class="navbar">
        <button class="navbar__menu-btn" (click)="toggleSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <a routerLink="/projects" class="navbar__brand">
          <div class="navbar__brand-logo">
            <app-logo [size]="28"></app-logo>
          </div>
          <span class="navbar__brand-text">Jirakli</span>
        </a>

        <div class="navbar__spacer"></div>

        <nav class="navbar__actions">
          <!-- Create Button -->
          <button class="navbar__create-btn" [matMenuTriggerFor]="createMenu">
            <mat-icon>add</mat-icon>
            Create
          </button>
          <mat-menu #createMenu="matMenu">
            <a mat-menu-item routerLink="/projects/new">
              <mat-icon>folder</mat-icon>
              <span>Project</span>
            </a>
          </mat-menu>

          <!-- Theme Toggle -->
          <button
            class="navbar__icon-btn"
            [matTooltip]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            (click)="toggleTheme()"
          >
            <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <!-- User Menu -->
          <button class="navbar__user-btn" [matMenuTriggerFor]="userMenu">
            <div class="navbar__avatar">
              {{ userInitials() }}
            </div>
          </button>
          <mat-menu #userMenu="matMenu" xPosition="before">
            <div class="user-menu-header">
              <div class="user-menu-header__avatar">{{ userInitials() }}</div>
              <div class="user-menu-header__info">
                <span class="user-menu-header__name">{{ userDisplayName() }}</span>
              </div>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Log out</span>
            </button>
          </mat-menu>
        </nav>
      </header>

      <!-- Main Layout -->
      <div class="app-layout">
        <!-- Sidebar -->
        <aside class="sidebar" [class.sidebar--collapsed]="sidebarCollapsed()">
          <nav class="sidebar__nav">
            <div class="sidebar__section">
              <a 
                routerLink="/projects" 
                routerLinkActive="sidebar__link--active"
                [routerLinkActiveOptions]="{exact: true}"
                class="sidebar__link"
              >
                <mat-icon>dashboard</mat-icon>
                <span class="sidebar__link-text">Projects</span>
              </a>
            </div>
            
            <div class="sidebar__divider"></div>
            
            <div class="sidebar__section">
              <span class="sidebar__title">Planning</span>
              <a 
                routerLink="/projects" 
                routerLinkActive="sidebar__link--active"
                class="sidebar__link"
              >
                <mat-icon>view_kanban</mat-icon>
                <span class="sidebar__link-text">Board</span>
              </a>
              <a 
                routerLink="/projects" 
                class="sidebar__link"
              >
                <mat-icon>list</mat-icon>
                <span class="sidebar__link-text">Backlog</span>
              </a>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="app-content">
          <router-outlet />
        </main>
      </div>
    } @else {
      <!-- Unauthenticated view (login/register) -->
      <router-outlet />
    }
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background-color: var(--color-bg);
    }

    /* =============================================
       Navigation Bar
       ============================================= */
    .navbar {
      height: 56px;
      background: var(--color-nav-bg);
      color: var(--color-neutral-0);
      display: flex;
      align-items: center;
      padding: 0 var(--space-200);
      position: sticky;
      top: 0;
      z-index: var(--z-nav);
      gap: var(--space-150);
    }

    .navbar__menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--color-neutral-0);
      border-radius: var(--radius-050);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }

    .navbar__menu-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .navbar__brand {
      display: flex;
      align-items: center;
      gap: var(--space-100);
      color: var(--color-neutral-0);
      text-decoration: none;
      transition: opacity var(--transition-fast);
    }

    .navbar__brand:hover {
      opacity: 0.9;
      text-decoration: none;
    }

    .navbar__brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .navbar__brand-text {
      font-size: var(--text-size-large);
      font-weight: var(--font-weight-semibold);
      letter-spacing: -0.5px;
    }

    .navbar__spacer {
      flex: 1;
    }

    .navbar__actions {
      display: flex;
      align-items: center;
      gap: var(--space-100);
    }

    .navbar__create-btn {
      display: flex;
      align-items: center;
      gap: var(--space-050);
      height: 32px;
      padding: 0 var(--space-150);
      background: var(--color-primary-500);
      color: var(--color-neutral-0);
      border: none;
      border-radius: var(--radius-050);
      font-size: var(--text-size-body);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }

    .navbar__create-btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .navbar__create-btn:hover {
      background: var(--color-primary-600);
    }

    .navbar__icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      border-radius: var(--radius-050);
      cursor: pointer;
      transition: background-color var(--transition-fast), color var(--transition-fast);
    }

    .navbar__icon-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--color-neutral-0);
    }

    .navbar__user-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    .navbar__avatar {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-round);
      background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
      color: var(--color-neutral-0);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-size-small);
      font-weight: var(--font-weight-semibold);
      transition: transform var(--transition-fast);
    }

    .navbar__user-btn:hover .navbar__avatar {
      transform: scale(1.05);
    }

    /* User Menu Header */
    .user-menu-header {
      display: flex;
      align-items: center;
      gap: var(--space-150);
      padding: var(--space-200);
    }

    .user-menu-header__avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-round);
      background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
      color: var(--color-neutral-0);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-size-body);
      font-weight: var(--font-weight-semibold);
    }

    .user-menu-header__info {
      display: flex;
      flex-direction: column;
    }

    .user-menu-header__name {
      font-weight: var(--font-weight-medium);
      color: var(--color-text);
    }

    /* =============================================
       Sidebar
       ============================================= */
    .app-layout {
      display: flex;
      min-height: calc(100vh - 56px);
    }

    .sidebar {
      width: 240px;
      background-color: var(--color-sidebar-bg);
      border-right: 1px solid var(--color-border);
      transition: width var(--transition-normal), transform var(--transition-normal);
      overflow: hidden;
      flex-shrink: 0;
    }

    .sidebar--collapsed {
      width: 0;
      border-right: none;
    }

    .sidebar__nav {
      padding: var(--space-150) 0;
    }

    .sidebar__section {
      padding: var(--space-050) var(--space-100);
    }

    .sidebar__title {
      display: block;
      padding: var(--space-100) var(--space-150);
      font-size: var(--text-size-tiny);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-subtlest);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .sidebar__link {
      display: flex;
      align-items: center;
      gap: var(--space-100);
      padding: var(--space-100) var(--space-150);
      border-radius: var(--radius-050);
      color: var(--color-text);
      text-decoration: none;
      font-size: var(--text-size-body);
      transition: background-color var(--transition-fast);
    }

    .sidebar__link:hover {
      background-color: var(--color-sidebar-hover);
      text-decoration: none;
    }

    .sidebar__link--active {
      background-color: var(--color-sidebar-active);
      color: var(--color-link);
    }

    .sidebar__link mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--color-text-subtle);
    }

    .sidebar__link--active mat-icon {
      color: var(--color-link);
    }

    .sidebar__divider {
      height: 1px;
      background-color: var(--color-border);
      margin: var(--space-150) var(--space-200);
    }

    /* =============================================
       Main Content
       ============================================= */
    .app-content {
      flex: 1;
      min-width: 0;
      background-color: var(--color-bg);
    }

    /* =============================================
       Responsive
       ============================================= */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        top: 56px;
        left: 0;
        height: calc(100vh - 56px);
        z-index: var(--z-sidebar);
        transform: translateX(0);
      }

      .sidebar--collapsed {
        transform: translateX(-100%);
        width: 240px;
      }

      .navbar__brand-text {
        display: none;
      }
    }
  `,
})
export class App {
  private readonly authState = inject(AuthStateService);
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authState.isAuthenticated;
  protected readonly userDisplayName = this.authState.userDisplayName;
  protected readonly isDark = this.themeService.isDark;
  protected readonly sidebarCollapsed = signal(false);

  protected userInitials(): string {
    const name = this.userDisplayName();
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  protected toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
