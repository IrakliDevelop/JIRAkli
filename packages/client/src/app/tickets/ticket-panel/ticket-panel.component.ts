import { Component, inject, signal, input, output, effect, OnDestroy } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketsService, type Ticket } from '../tickets.service';

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
  selector: 'app-ticket-panel',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TitleCasePipe,
    DatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './ticket-panel.component.html',
  styleUrl: './ticket-panel.component.scss',
})
export class TicketPanelComponent implements OnDestroy {
  private readonly ticketsService = inject(TicketsService);

  // Inputs
  readonly ticketId = input<string | null>(null);
  readonly projectKey = input<string>('');
  readonly isOpen = input<boolean>(false);

  // Outputs
  readonly closed = output<void>();
  readonly ticketUpdated = output<Ticket>();
  readonly ticketDeleted = output<string>();

  // State
  protected readonly ticket = signal<Ticket | null>(null);
  protected readonly loading = signal(false);

  protected readonly statuses = STATUSES;
  protected readonly priorities = PRIORITIES;

  private keyboardHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };

  constructor() {
    // Load ticket when ticketId changes
    effect(() => {
      const id = this.ticketId();
      if (id) {
        this.loadTicket(id);
      } else {
        this.ticket.set(null);
      }
    });

    // Handle escape key
    document.addEventListener('keydown', this.keyboardHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyboardHandler);
  }

  private loadTicket(id: string): void {
    this.loading.set(true);
    this.ticketsService.getTicket(id).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  protected getStatusLabel(status: string): string {
    return STATUS_LABELS[status] || status;
  }

  protected updateStatus(status: string): void {
    const ticket = this.ticket();
    if (!ticket) return;

    this.ticketsService.updateTicket(ticket.id, { status }).subscribe({
      next: (updated) => {
        this.ticket.set(updated);
        this.ticketUpdated.emit(updated);
      },
    });
  }

  protected updatePriority(priority: string): void {
    const ticket = this.ticket();
    if (!ticket) return;

    this.ticketsService.updateTicket(ticket.id, { priority }).subscribe({
      next: (updated) => {
        this.ticket.set(updated);
        this.ticketUpdated.emit(updated);
      },
    });
  }

  protected copyLink(): void {
    const ticket = this.ticket();
    if (!ticket) return;

    const url = `${window.location.origin}/tickets/${ticket.id}`;
    navigator.clipboard.writeText(url);
  }

  protected deleteTicket(): void {
    const ticket = this.ticket();
    if (!ticket) return;

    if (confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
      this.ticketsService.deleteTicket(ticket.id).subscribe({
        next: () => {
          this.ticketDeleted.emit(ticket.id);
          this.close();
        },
      });
    }
  }

  protected close(): void {
    this.closed.emit();
  }
}
