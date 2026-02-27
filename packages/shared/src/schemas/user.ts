import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    displayName: text('display_name').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (table) => [index('users_email_idx').on(table.email)],
);

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  displayName: z.string().min(1).max(255),
});

export const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Public user (without password hash)
export type PublicUser = Omit<User, 'passwordHash'>;
