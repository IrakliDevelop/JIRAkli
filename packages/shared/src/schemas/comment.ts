import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './user';
import { tickets } from './ticket';

export const comments = sqliteTable(
  'comments',
  {
    id: text('id').primaryKey(),
    ticketId: text('ticket_id')
      .notNull()
      .references(() => tickets.id, { onDelete: 'cascade' }),
    authorId: text('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    content: text('content').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    index('comments_ticket_idx').on(table.ticketId),
    index('comments_author_idx').on(table.authorId),
    index('comments_created_at_idx').on(table.createdAt),
  ],
);

export const insertCommentSchema = createInsertSchema(comments, {
  content: z.string().min(1).max(10000),
});

export const selectCommentSchema = createSelectSchema(comments);

export type Comment = z.infer<typeof selectCommentSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
