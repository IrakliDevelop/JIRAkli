import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient [id]="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" class="logo-stop-start"/>
          <stop offset="100%" class="logo-stop-end"/>
        </linearGradient>
      </defs>
      <path 
        d="M15.52 2.488c-.252-.248-.66-.248-.912 0L2.488 14.608c-.248.252-.248.66 0 .912L14.608 27.64c.252.248.66.248.912 0l4.24-4.24c.248-.252.248-.66 0-.912l-7.28-7.28a.644.644 0 010-.912l7.28-7.28c.248-.252.248-.66 0-.912l-4.24-4.616z" 
        [attr.fill]="'url(#' + gradientId + ')'"
      />
      <path 
        d="M16.48 2.488c.252-.248.66-.248.912 0l12.12 12.12c.248.252.248.66 0 .912l-12.12 12.12c-.252.248-.66.248-.912 0l-4.24-4.24c-.248-.252-.248-.66 0-.912l7.28-7.28a.644.644 0 000-.912l-7.28-7.28c-.248-.252-.248-.66 0-.912l4.24-4.616z" 
        [attr.fill]="'url(#' + gradientId + ')'" 
        fill-opacity="0.5"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-stop-start {
      stop-color: var(--color-logo-start, var(--color-primary-300));
    }
    
    .logo-stop-end {
      stop-color: var(--color-logo-end, var(--color-primary-600));
    }
  `
})
export class LogoComponent {
  @Input() size: number = 32;
  
  // Unique gradient ID to avoid conflicts when multiple logos are on the page
  protected readonly gradientId = `logo-gradient-${Math.random().toString(36).substring(2, 9)}`;
}
