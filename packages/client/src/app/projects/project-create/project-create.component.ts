import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
})
export class ProjectCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    key: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(6),
        Validators.pattern(/^[A-Z]+$/),
      ],
    ],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
  });

  protected onSubmit(): void {
    // Convert key to uppercase
    const keyValue = this.form.controls.key.value.toUpperCase();
    this.form.controls.key.setValue(keyValue);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const values = this.form.getRawValue();
    this.projectsService
      .createProject({
        key: values.key,
        name: values.name,
        description: values.description || undefined,
      })
      .subscribe({
        next: (project) => {
          this.router.navigate(['/projects', project.id]);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          this.error.set(err.error?.message ?? 'Failed to create project');
        },
      });
  }
}
