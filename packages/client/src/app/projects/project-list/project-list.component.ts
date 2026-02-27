import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService, type Project } from '../projects.service';

@Component({
  selector: 'app-project-list',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects = signal<Project[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProjects();
  }

  protected loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load projects');
        this.loading.set(false);
      },
    });
  }
}
