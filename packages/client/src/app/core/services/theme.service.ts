import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'jirakli-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _theme = signal<Theme>(this.getStoredTheme());
  private readonly _systemPrefersDark = signal(this.getSystemPreference());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => {
    const theme = this._theme();
    if (theme === 'system') {
      return this._systemPrefersDark();
    }
    return theme === 'dark';
  });

  constructor() {
    // Apply theme when it changes
    effect(() => {
      this.applyTheme(this.isDark());
    });

    // Listen to system preference changes
    if (this.isBrowser) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this._systemPrefersDark.set(e.matches);
      });
    }
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  toggleTheme(): void {
    const currentlyDark = this.isDark();
    this.setTheme(currentlyDark ? 'light' : 'dark');
  }

  private getStoredTheme(): Theme {
    if (!this.isBrowser) {
      return 'system';
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
    return 'system';
  }

  private getSystemPreference(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser) {
      return;
    }
    const html = document.documentElement;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
