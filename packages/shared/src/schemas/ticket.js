"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTicketSchema = exports.insertTicketSchema = exports.tickets = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const user_1 = require("./user");
const project_1 = require("./project");
const constants_1 = require("../constants");
exports.tickets = (0, sqlite_core_1.sqliteTable)('tickets', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    projectId: (0, sqlite_core_1.text)('project_id')
        .notNull()
        .references(() => project_1.projects.id, { onDelete: 'cascade' }),
    number: (0, sqlite_core_1.integer)('number').notNull(),
    title: (0, sqlite_core_1.text)('title').notNull(),
    description: (0, sqlite_core_1.text)('description'),
    status: (0, sqlite_core_1.text)('status', { enum: constants_1.TICKET_STATUS }).notNull().default('backlog'),
    priority: (0, sqlite_core_1.text)('priority', { enum: constants_1.TICKET_PRIORITY })
        .notNull()
        .default('medium'),
    assigneeId: (0, sqlite_core_1.text)('assignee_id').references(() => user_1.users.id, {
        onDelete: 'set null',
    }),
    reporterId: (0, sqlite_core_1.text)('reporter_id')
        .notNull()
        .references(() => user_1.users.id, { onDelete: 'restrict' }),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [
    (0, sqlite_core_1.uniqueIndex)('tickets_project_number_idx').on(table.projectId, table.number),
    (0, sqlite_core_1.index)('tickets_project_status_idx').on(table.projectId, table.status),
    (0, sqlite_core_1.index)('tickets_assignee_idx').on(table.assigneeId),
    (0, sqlite_core_1.index)('tickets_reporter_idx').on(table.reporterId),
    (0, sqlite_core_1.index)('tickets_created_at_idx').on(table.createdAt),
]);
exports.insertTicketSchema = (0, drizzle_zod_1.createInsertSchema)(exports.tickets, {
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(10000).optional(),
});
exports.selectTicketSchema = (0, drizzle_zod_1.createSelectSchema)(exports.tickets);
//# sourceMappingURL=ticket.js.map