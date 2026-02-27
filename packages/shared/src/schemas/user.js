"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserSchema = exports.insertUserSchema = exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    email: (0, sqlite_core_1.text)('email').notNull().unique(),
    passwordHash: (0, sqlite_core_1.text)('password_hash').notNull(),
    displayName: (0, sqlite_core_1.text)('display_name').notNull(),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [(0, sqlite_core_1.index)('users_email_idx').on(table.email)]);
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users, {
    email: zod_1.z.string().email(),
    displayName: zod_1.z.string().min(1).max(255),
});
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
//# sourceMappingURL=user.js.map