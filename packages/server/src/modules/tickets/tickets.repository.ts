import { Injectable, Inject } from '@nestjs/common';
import { eq, and, desc, sql, like, or } from 'drizzle-orm';
import { DATABASE } from '../../database';
import type { DrizzleDatabase } from '../../database';
import {
  tickets,
  type Ticket,
  type InsertTicket,
  type TicketFilters,
  type PaginationParams,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '@jirakli/shared';

@Injectable()
export class TicketsRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDatabase) {}

  async findById(id: string): Promise<Ticket | null> {
    const result = await this.db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByProject(
    projectId: string,
    filters?: TicketFilters,
    pagination?: PaginationParams,
  ): Promise<{ items: Ticket[]; total: number }> {
    const page = pagination?.page ?? 1;
    const pageSize = Math.min(
      pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
      MAX_PAGE_SIZE,
    );
    const offset = (page - 1) * pageSize;

    // Build where conditions
    const conditions = [eq(tickets.projectId, projectId)];

    if (filters?.status) {
      conditions.push(eq(tickets.status, filters.status));
    }
    if (filters?.priority) {
      conditions.push(eq(tickets.priority, filters.priority));
    }
    if (filters?.assigneeId) {
      conditions.push(eq(tickets.assigneeId, filters.assigneeId));
    }
    if (filters?.reporterId) {
      conditions.push(eq(tickets.reporterId, filters.reporterId));
    }
    if (filters?.search) {
      conditions.push(
        or(
          like(tickets.title, `%${filters.search}%`),
          like(tickets.description, `%${filters.search}%`),
        )!,
      );
    }

    const whereClause = and(...conditions);

    // Get items and count in parallel
    const [items, countResult] = await Promise.all([
      this.db
        .select()
        .from(tickets)
        .where(whereClause)
        .orderBy(desc(tickets.createdAt))
        .limit(pageSize)
        .offset(offset),
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(tickets)
        .where(whereClause),
    ]);

    return {
      items,
      total: countResult[0]?.count ?? 0,
    };
  }

  async create(
    data: Omit<InsertTicket, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Ticket> {
    const now = new Date();
    const [created] = await this.db
      .insert(tickets)
      .values({
        id: crypto.randomUUID(),
        ...data,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return created;
  }

  async update(
    id: string,
    data: Partial<
      Pick<
        Ticket,
        'title' | 'description' | 'status' | 'priority' | 'assigneeId'
      >
    >,
  ): Promise<Ticket> {
    const [updated] = await this.db
      .update(tickets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tickets.id, id))
      .returning();

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(tickets).where(eq(tickets.id, id));
  }

  async getNextNumber(projectId: string): Promise<number> {
    const result = await this.db
      .select({
        maxNumber: sql<number>`COALESCE(MAX(${tickets.number}), 0)`,
      })
      .from(tickets)
      .where(eq(tickets.projectId, projectId));

    return (result[0]?.maxNumber ?? 0) + 1;
  }
}
