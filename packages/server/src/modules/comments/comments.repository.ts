import { Injectable, Inject } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DATABASE } from '../../database';
import type { DrizzleDatabase } from '../../database';
import { comments, type Comment, type InsertComment } from '@jirakli/shared';

@Injectable()
export class CommentsRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDatabase) {}

  async findById(id: string): Promise<Comment | null> {
    const result = await this.db
      .select()
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByTicket(ticketId: string): Promise<Comment[]> {
    return this.db
      .select()
      .from(comments)
      .where(eq(comments.ticketId, ticketId))
      .orderBy(desc(comments.createdAt));
  }

  async create(
    data: Omit<InsertComment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Comment> {
    const now = new Date();
    const [created] = await this.db
      .insert(comments)
      .values({
        id: crypto.randomUUID(),
        ...data,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return created;
  }

  async update(id: string, data: Pick<Comment, 'content'>): Promise<Comment> {
    const [updated] = await this.db
      .update(comments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();

    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(comments).where(eq(comments.id, id));
  }
}
