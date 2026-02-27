import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { LogoComponent } from '../../shared';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
    MatIconModule,
    LogoComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hidePassword = signal(true);

  protected readonly form = this.fb.nonNullable.group({
    displayName: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formData = this.form.getRawValue();
    formData.email = formData.email.toLowerCase();

    this.authService.register(formData).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'An error occurred');
      },
    });
  }
}
