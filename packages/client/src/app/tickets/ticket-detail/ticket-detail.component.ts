import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { TicketsService, type Ticket } from '../tickets.service';
import { ProjectsService, type Project } from '../../projects/projects.service';

const STATUSES = ['backlog', 'todo', 'in_progress', 'review', 'done'];
const PRIORITIES = ['low', 'medium', 'high', 'critical'];

const STATUS_LABELS: Record<string, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'In Review',
  done: 'Done',
};

@Component({
  selector: 'app-ticket-detail',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TitleCasePipe,
    DatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
})
export class TicketDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly ticketsService = inject(TicketsService);
  private readonly projectsService = inject(ProjectsService);

  protected readonly statuses = STATUSES;
  protected readonly priorities = PRIORITIES;

  protected readonly ticket = signal<Ticket | null>(null);
  protected readonly project = signal<Project | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const ticketId = this.route.snapshot.params['id'];
    this.loadTicket(ticketId);
  }

  private loadTicket(id: string): void {
    this.ticketsService.getTicket(id).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.loading.set(false);
        this.loadProject(ticket.projectId);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load ticket');
        this.loading.set(false);
      },
    });
  }

  private loadProject(id: string): void {
    this.projectsService.getProject(id).subscribe({
      next: (project) => this.project.set(project),
    });
  }

  protected getStatusLabel(status: string): string {
    return STATUS_LABELS[status] || status;
  }

  protected updateStatus(status: string): void {
    const ticket = this.ticket();
    if (!ticket) return;

    this.ticketsService.updateTicket(ticket.id, { status }).subscribe({
      next: (updated) => this.ticket.set(updated),
    });
  }

  protected updatePriority(priority: string): void {
    const ticket = this.ticket();
    if (!ticket) return;

    this.ticketsService.updateTicket(ticket.id, { priority }).subscribe({
      next: (updated) => this.ticket.set(updated),
    });
  }

  protected deleteTicket(): void {
    const ticket = this.ticket();
    if (!ticket) return;

    if (confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
      this.ticketsService.deleteTicket(ticket.id).subscribe({
        next: () => this.router.navigate(['/projects', ticket.projectId]),
      });
    }
  }
}
