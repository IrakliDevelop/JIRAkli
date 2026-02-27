"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommentSchema = exports.insertCommentSchema = exports.comments = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const user_1 = require("./user");
const ticket_1 = require("./ticket");
exports.comments = (0, sqlite_core_1.sqliteTable)('comments', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    ticketId: (0, sqlite_core_1.text)('ticket_id')
        .notNull()
        .references(() => ticket_1.tickets.id, { onDelete: 'cascade' }),
    authorId: (0, sqlite_core_1.text)('author_id')
        .notNull()
        .references(() => user_1.users.id, { onDelete: 'restrict' }),
    content: (0, sqlite_core_1.text)('content').notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [
    (0, sqlite_core_1.index)('comments_ticket_idx').on(table.ticketId),
    (0, sqlite_core_1.index)('comments_author_idx').on(table.authorId),
    (0, sqlite_core_1.index)('comments_created_at_idx').on(table.createdAt),
]);
exports.insertCommentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.comments, {
    content: zod_1.z.string().min(1).max(10000),
});
exports.selectCommentSchema = (0, drizzle_zod_1.createSelectSchema)(exports.comments);
//# sourceMappingURL=comment.js.map