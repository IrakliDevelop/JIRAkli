import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './user';

export const projects = sqliteTable(
  'projects',
  {
    id: text('id').primaryKey(),
    key: text('key').notNull().unique(), // e.g., "JIR" for ticket prefixes
    name: text('name').notNull(),
    description: text('description'),
    createdById: text('created_by_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [
    index('projects_key_idx').on(table.key),
    index('projects_created_by_idx').on(table.createdById),
  ],
);

export const insertProjectSchema = createInsertSchema(projects, {
  key: z
    .string()
    .min(2)
    .max(6)
    .regex(/^[A-Z]+$/, 'Key must be uppercase letters only'),
  name: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
});

export const selectProjectSchema = createSelectSchema(projects);

export type Project = z.infer<typeof selectProjectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
