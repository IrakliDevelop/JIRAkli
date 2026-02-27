import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { TicketsService } from '../tickets.service';
import { ProjectsService, type Project } from '../../projects/projects.service';

@Component({
  selector: 'app-ticket-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss',
})
export class TicketCreateComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ticketsService = inject(TicketsService);
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected projectId = '';
  protected readonly project = signal<Project | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly selectedPriority = signal('medium');

  protected readonly priorities = ['low', 'medium', 'high', 'critical'];

  protected readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
    priority: ['medium'],
  });

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadProject();
  }

  private loadProject(): void {
    this.projectsService.getProject(this.projectId).subscribe({
      next: (project) => this.project.set(project),
    });
  }

  protected selectPriority(priority: string): void {
    this.selectedPriority.set(priority);
    this.form.controls.priority.setValue(priority);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const values = this.form.getRawValue();
    this.ticketsService
      .createTicket(this.projectId, {
        title: values.title,
        description: values.description || undefined,
        priority: values.priority,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/projects', this.projectId]);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          this.error.set(err.error?.message ?? 'Failed to create issue');
        },
      });
  }
}
