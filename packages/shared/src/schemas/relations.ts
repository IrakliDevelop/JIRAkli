import { relations } from 'drizzle-orm';
import { users } from './user';
import { projects } from './project';
import { tickets } from './ticket';
import { comments } from './comment';

export const usersRelations = relations(users, ({ many }) => ({
  createdProjects: many(projects),
  assignedTickets: many(tickets, { relationName: 'assignee' }),
  reportedTickets: many(tickets, { relationName: 'reporter' }),
  comments: many(comments),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id],
  }),
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  project: one(projects, {
    fields: [tickets.projectId],
    references: [projects.id],
  }),
  assignee: one(users, {
    fields: [tickets.assigneeId],
    references: [users.id],
    relationName: 'assignee',
  }),
  reporter: one(users, {
    fields: [tickets.reporterId],
    references: [users.id],
    relationName: 'reporter',
  }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  ticket: one(tickets, {
    fields: [comments.ticketId],
    references: [tickets.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));
