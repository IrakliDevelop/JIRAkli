"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.ticketsRelations = exports.projectsRelations = exports.usersRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = require("./user");
const project_1 = require("./project");
const ticket_1 = require("./ticket");
const comment_1 = require("./comment");
exports.usersRelations = (0, drizzle_orm_1.relations)(user_1.users, ({ many }) => ({
    createdProjects: many(project_1.projects),
    assignedTickets: many(ticket_1.tickets, { relationName: 'assignee' }),
    reportedTickets: many(ticket_1.tickets, { relationName: 'reporter' }),
    comments: many(comment_1.comments),
}));
exports.projectsRelations = (0, drizzle_orm_1.relations)(project_1.projects, ({ one, many }) => ({
    createdBy: one(user_1.users, {
        fields: [project_1.projects.createdById],
        references: [user_1.users.id],
    }),
    tickets: many(ticket_1.tickets),
}));
exports.ticketsRelations = (0, drizzle_orm_1.relations)(ticket_1.tickets, ({ one, many }) => ({
    project: one(project_1.projects, {
        fields: [ticket_1.tickets.projectId],
        references: [project_1.projects.id],
    }),
    assignee: one(user_1.users, {
        fields: [ticket_1.tickets.assigneeId],
        references: [user_1.users.id],
        relationName: 'assignee',
    }),
    reporter: one(user_1.users, {
        fields: [ticket_1.tickets.reporterId],
        references: [user_1.users.id],
        relationName: 'reporter',
    }),
    comments: many(comment_1.comments),
}));
exports.commentsRelations = (0, drizzle_orm_1.relations)(comment_1.comments, ({ one }) => ({
    ticket: one(ticket_1.tickets, {
        fields: [comment_1.comments.ticketId],
        references: [ticket_1.tickets.id],
    }),
    author: one(user_1.users, {
        fields: [comment_1.comments.authorId],
        references: [user_1.users.id],
    }),
}));
//# sourceMappingURL=relations.js.map