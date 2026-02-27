import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Ticket {
  id: string;
  projectId: string;
  number: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assigneeId: string | null;
  reporterId: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedTicketsResponse {
  data: Ticket[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface TicketResponse {
  data: Ticket;
}

export interface CreateTicketDto {
  title: string;
  description?: string;
  priority?: string;
  assigneeId?: string;
}

export interface UpdateTicketDto {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigneeId?: string | null;
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getTickets(projectId: string, filters?: { status?: string; priority?: string }): Observable<PaginatedTicketsResponse> {
    let params = new HttpParams();
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.priority) params = params.set('priority', filters.priority);

    return this.http.get<PaginatedTicketsResponse>(
      `${this.apiUrl}/projects/${projectId}/tickets`,
      { params },
    );
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http
      .get<TicketResponse>(`${this.apiUrl}/tickets/${id}`)
      .pipe(map((res) => res.data));
  }

  createTicket(projectId: string, dto: CreateTicketDto): Observable<Ticket> {
    return this.http
      .post<TicketResponse>(`${this.apiUrl}/projects/${projectId}/tickets`, dto)
      .pipe(map((res) => res.data));
  }

  updateTicket(id: string, dto: UpdateTicketDto): Observable<Ticket> {
    return this.http
      .patch<TicketResponse>(`${this.apiUrl}/tickets/${id}`, dto)
      .pipe(map((res) => res.data));
  }

  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tickets/${id}`);
  }
}
