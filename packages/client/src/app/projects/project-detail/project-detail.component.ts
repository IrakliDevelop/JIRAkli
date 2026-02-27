import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectsService, type Project } from '../projects.service';
import { TicketsService, type Ticket } from '../../tickets/tickets.service';
import { TicketPanelComponent } from '../../tickets/ticket-panel/ticket-panel.component';

interface BoardColumn {
  id: string;
  title: string;
  status: string;
  tickets: Ticket[];
}

const COLUMN_CONFIG = [
  { id: 'backlog', title: 'Backlog', status: 'backlog' },
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
  { id: 'review', title: 'In Review', status: 'review' },
  { id: 'done', title: 'Done', status: 'done' },
];

@Component({
  selector: 'app-project-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    DragDropModule,
    TicketPanelComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);
  private readonly ticketsService = inject(TicketsService);

  protected readonly project = signal<Project | null>(null);
  protected readonly tickets = signal<Ticket[]>([]);
  protected readonly loading = signal(true);
  protected readonly ticketsLoading = signal(true);
  protected readonly error = signal<string | null>(null);

  // Panel state
  protected readonly selectedTicketId = signal<string | null>(null);
  protected readonly panelOpen = signal(false);

  protected readonly columns = computed<BoardColumn[]>(() => {
    const allTickets = this.tickets();
    return COLUMN_CONFIG.map(config => ({
      ...config,
      tickets: allTickets.filter(t => t.status === config.status),
    }));
  });

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.loadProject(projectId);
    this.loadTickets(projectId);
  }

  private loadProject(id: string): void {
    this.projectsService.getProject(id).subscribe({
      next: (project) => {
        this.project.set(project);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load project');
        this.loading.set(false);
      },
    });
  }

  private loadTickets(projectId: string): void {
    this.ticketsService.getTickets(projectId).subscribe({
      next: (response) => {
        this.tickets.set(response.data);
        this.ticketsLoading.set(false);
      },
      error: () => {
        this.ticketsLoading.set(false);
      },
    });
  }

  protected getInitials(ticket: Ticket): string {
    // For now, return a placeholder. In a real app, you'd use the assignee's name.
    return '?';
  }

  protected openTicketPanel(ticket: Ticket, event: MouseEvent): void {
    // If ctrl/cmd click or middle click, let the default behavior happen (open in new tab)
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      window.open(`/tickets/${ticket.id}`, '_blank');
      return;
    }

    this.selectedTicketId.set(ticket.id);
    this.panelOpen.set(true);
  }

  protected closePanel(): void {
    this.panelOpen.set(false);
    // Delay clearing the ticket ID to allow the close animation to complete
    setTimeout(() => {
      if (!this.panelOpen()) {
        this.selectedTicketId.set(null);
      }
    }, 200);
  }

  protected onTicketUpdated(updatedTicket: Ticket): void {
    const tickets = this.tickets();
    const index = tickets.findIndex(t => t.id === updatedTicket.id);
    if (index !== -1) {
      tickets[index] = updatedTicket;
      this.tickets.set([...tickets]);
    }
  }

  protected onTicketDeleted(ticketId: string): void {
    const tickets = this.tickets().filter(t => t.id !== ticketId);
    this.tickets.set(tickets);
  }

  protected onDrop(event: CdkDragDrop<Ticket[]>, newStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const ticket = event.previousContainer.data[event.previousIndex];
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Update the ticket status on the server
      this.ticketsService.updateTicket(ticket.id, { status: newStatus }).subscribe({
        next: (updated) => {
          // Update the local ticket with the response
          const tickets = this.tickets();
          const index = tickets.findIndex(t => t.id === updated.id);
          if (index !== -1) {
            tickets[index] = updated;
            this.tickets.set([...tickets]);
          }
        },
        error: () => {
          // Revert on error
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex,
          );
        },
      });
    }
  }
}
