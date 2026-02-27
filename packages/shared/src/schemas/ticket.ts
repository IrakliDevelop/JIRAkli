import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './user';
import { projects } from './project';
import { TICKET_STATUS, TICKET_PRIORITY } from '../constants';

export const tickets = sqliteTable(
  'tickets',
  {
    id: text('id').primaryKey(),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    number: integer('number').notNull(), // Per-project ticket number
    title: text('title').notNull(),
    description: text('description'),
    status: text('status', { enum: TICKET_STATUS }).notNull().default('backlog'),
    priority: text('priority', { enum: TICKET_PRIORITY })
      .notNull()
      .default('medium'),
    assigneeId: text('assignee_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    reporterId: text('reporter_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    // Composite unique: ticket number is unique within a project
    uniqueIndex('tickets_project_number_idx').on(table.projectId, table.number),
    // Query optimization indexes
    index('tickets_project_status_idx').on(table.projectId, table.status),
    index('tickets_assignee_idx').on(table.assigneeId),
    index('tickets_reporter_idx').on(table.reporterId),
    index('tickets_created_at_idx').on(table.createdAt),
  ],
);

export const insertTicketSchema = createInsertSchema(tickets, {
  title: z.string().min(1).max(255),
  description: z.string().max(10000).optional(),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type Ticket = z.infer<typeof selectTicketSchema>;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
